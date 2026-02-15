using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudyMate.DTOs;
using StudyMate.Models;
using StudyMate.Interfaces;

namespace StudyMate.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class VideosController : ControllerBase
{
    private readonly IVideoRepository _videoRepository;
    private readonly IWebHostEnvironment _environment;
    private readonly ILogger<VideosController> _logger;

    public VideosController(
        IVideoRepository videoRepository,
        IWebHostEnvironment environment,
        ILogger<VideosController> logger)
    {
        _videoRepository = videoRepository;
        _environment = environment;
        _logger = logger;
    }

    [HttpGet("course/{courseId}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetByCourseId(Guid courseId)
    {
        var videos = await _videoRepository.GetByCourseIdAsync(courseId);
        var videoDtos = videos.Select(MapToVideoDto).ToList();
        return Ok(videoDtos);
    }

    [HttpGet("{id}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetById(Guid id)
    {
        var video = await _videoRepository.GetByIdAsync(id);
        if (video == null)
        {
            return NotFound(new { message = "Video not found" });
        }
        var videoDto = MapToVideoDto(video);
        return Ok(videoDto);
    }

    [HttpPost]
    [Authorize(Roles = "Teacher")]
    public async Task<IActionResult> Create([FromBody] CreateVideoDto createDto)
    {
        var video = new Video
        {
            Id = Guid.NewGuid(),
            CourseId = createDto.CourseId,
            Title = createDto.Title,
            Description = createDto.Description,
            VideoUrl = createDto.VideoUrl,
            ThumbnailUrl = createDto.ThumbnailUrl,
            Duration = createDto.Duration,
            Order = createDto.Order,
            IsPublished = createDto.IsPublished,
            CreatedAt = DateTime.UtcNow
        };
        
        var createdVideo = await _videoRepository.AddAsync(video);
        var videoDto = MapToVideoDto(createdVideo);
        return CreatedAtAction(nameof(GetById), new { id = createdVideo.Id }, videoDto);
    }

    [HttpPost("upload")]
    [Authorize(Roles = "Teacher")]
    public async Task<IActionResult> UploadVideo(
        [FromForm] string title,
        [FromForm] string description,
        [FromForm] string category,
        [FromForm] string price,
        [FromForm] IFormFile? file)
    {
        try
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest(new { message = "اختر ملف فيديو رجاء" });
            }

            // Validate file size (2GB max)
            const long maxFileSize = 2L * 1024L * 1024L * 1024L; // 2GB
            if (file.Length > maxFileSize)
            {
                return BadRequest(new { message = "حجم الملف أكبر من 2 جيجا" });
            }

            // Validate file type
            var allowedExtensions = new[] { ".mp4", ".avi", ".mov", ".mkv", ".webm", ".flv" };
            var fileExtension = Path.GetExtension(file.FileName).ToLower();
            if (!allowedExtensions.Contains(fileExtension))
            {
                return BadRequest(new { message = "صيغة الملف غير مدعومة" });
            }

            // Create uploads directory if it doesn't exist
            var uploadsDir = Path.Combine(_environment.WebRootPath ?? "wwwroot", "uploads", "videos");
            Directory.CreateDirectory(uploadsDir);

            // Generate unique filename
            var fileName = $"{Guid.NewGuid()}{fileExtension}";
            var filePath = Path.Combine(uploadsDir, fileName);

            // Save file
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // For now, create a mock Guid courseId - in production, user would select course
            var courseId = Guid.NewGuid();

            // Create video record in database
            var video = new Video
            {
                Id = Guid.NewGuid(),
                CourseId = courseId,
                Title = title,
                Description = description,
                VideoUrl = $"/uploads/videos/{fileName}",
                ThumbnailUrl = $"/uploads/videos/thumbnails/{fileName}.jpg", // Would need thumbnail generation
                Duration = 0, // Would need video analysis to get actual duration
                Order = 1,
                IsPublished = true,
                CreatedAt = DateTime.UtcNow
            };

            var createdVideo = await _videoRepository.AddAsync(video);
            var videoDto = MapToVideoDto(createdVideo);

            return CreatedAtAction(nameof(GetById), new { id = createdVideo.Id }, videoDto);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error uploading video");
            return StatusCode(500, new { message = "حدث خطأ في رفع الفيديو", details = ex.Message });
        }
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Teacher")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateVideoDto updateDto)
    {
        var existingVideo = await _videoRepository.GetByIdAsync(id);
        if (existingVideo == null)
        {
            return NotFound(new { message = "Video not found" });
        }

        existingVideo.Title = updateDto.Title;
        existingVideo.Description = updateDto.Description;
        existingVideo.VideoUrl = updateDto.VideoUrl;
        existingVideo.ThumbnailUrl = updateDto.ThumbnailUrl;
        existingVideo.Duration = updateDto.Duration;
        existingVideo.Order = updateDto.Order;
        existingVideo.IsPublished = updateDto.IsPublished;
        existingVideo.UpdatedAt = DateTime.UtcNow;
        
        await _videoRepository.UpdateAsync(existingVideo);
        var videoDto = MapToVideoDto(existingVideo);
        return Ok(videoDto);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Teacher")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _videoRepository.DeleteAsync(id);
        return NoContent();
    }

    [HttpPost("{id}/watch")]
    [Authorize]
    public async Task<IActionResult> MarkVideoAsWatched(Guid id, [FromBody] VideoWatchDto watchDto)
    {
        var video = await _videoRepository.GetByIdAsync(id);
        if (video == null)
        {
            return NotFound(new { message = "Video not found" });
        }

        // In a real app, you would store this in a database table for tracking
        // For now, just return success
        return Ok(new { message = "Video watch recorded", videoId = id });
    }

    [HttpGet("{id}/progress")]
    [Authorize]
    public async Task<IActionResult> GetVideoProgress(Guid id)
    {
        var video = await _videoRepository.GetByIdAsync(id);
        if (video == null)
        {
            return NotFound(new { message = "Video not found" });
        }

        var progressDto = new VideoProgressDto
        {
            VideoId = id,
            WatchedDuration = 0, // Would fetch from database
            TotalDuration = video.Duration,
            ProgressPercentage = 0,
            LastWatchedAt = null
        };

        return Ok(progressDto);
    }

    [HttpPost("{id}/duration")]
    [Authorize(Roles = "Teacher")]
    public async Task<IActionResult> UpdateVideoDuration(Guid id, [FromBody] UpdateVideoDurationDto updateDto)
    {
        var video = await _videoRepository.GetByIdAsync(id);
        if (video == null)
        {
            return NotFound(new { message = "Video not found" });
        }

        video.Duration = updateDto.Duration;
        video.UpdatedAt = DateTime.UtcNow;
        
        await _videoRepository.UpdateAsync(video);
        return Ok(new { message = "Duration updated", duration = video.Duration });
    }

    [HttpGet("{id}/analytics")]
    [Authorize(Roles = "Teacher")]
    public async Task<IActionResult> GetVideoAnalytics(Guid id)
    {
        var video = await _videoRepository.GetByIdAsync(id);
        if (video == null)
        {
            return NotFound(new { message = "Video not found" });
        }

        var analyticsDto = new VideoAnalyticsDto
        {
            VideoId = id,
            Title = video.Title,
            ViewCount = 0, // Would fetch from database
            StudentCount = 0, // Would fetch from enrollments
            AverageCompletionPercentage = 0
        };

        return Ok(analyticsDto);
    }

    [HttpGet("my-videos")]
    [Authorize(Roles = "Teacher")]
    public async Task<IActionResult> GetMyVideos()
    {
        // This endpoint would require joining with courses and getting teacher's courses
        // For now, return empty list - implementation depends on repository design
        return Ok(new List<VideoDto>());
    }

    private static VideoDto MapToVideoDto(Video video)
    {
        return new VideoDto
        {
            Id = video.Id,
            CourseId = video.CourseId,
            Title = video.Title,
            Description = video.Description,
            VideoUrl = video.VideoUrl,
            ThumbnailUrl = video.ThumbnailUrl,
            Duration = video.Duration,
            Order = video.Order,
            IsPublished = video.IsPublished,
            CreatedAt = video.CreatedAt
        };
    }
}
