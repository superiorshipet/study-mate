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

    public VideosController(IVideoRepository videoRepository)
    {
        _videoRepository = videoRepository;
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
