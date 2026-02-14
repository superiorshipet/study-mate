using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudyMate.DTOs;
using StudyMate.Models;
using StudyMate.Interfaces;

namespace StudyMate.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class CoursesController : ControllerBase
{
    private readonly ICourseRepository _courseRepository;

    public CoursesController(ICourseRepository courseRepository)
    {
        _courseRepository = courseRepository;
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetAll()
    {
        var courses = await _courseRepository.GetPublishedCoursesAsync();
        var courseDtos = courses.Select(MapToCourseDto).ToList();
        return Ok(courseDtos);
    }

    [HttpGet("{id}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetById(Guid id)
    {
        var course = await _courseRepository.GetByIdAsync(id);
        if (course == null)
        {
            return NotFound(new { message = "Course not found" });
        }
        var courseDto = MapToCourseDto(course);
        return Ok(courseDto);
    }

    [HttpGet("teacher/{teacherId}")]
    [Authorize(Roles = "Teacher")]
    public async Task<IActionResult> GetByTeacherId(Guid teacherId)
    {
        var courses = await _courseRepository.GetByTeacherIdAsync(teacherId);
        var courseDtos = courses.Select(MapToCourseDto).ToList();
        return Ok(courseDtos);
    }

    [HttpPost]
    [Authorize(Roles = "Teacher")]
    public async Task<IActionResult> Create([FromBody] CreateCourseDto createDto)
    {
        var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdClaim, out var teacherId))
        {
            return BadRequest(new { message = "Invalid user context" });
        }

        var course = new Course
        {
            Id = Guid.NewGuid(),
            TeacherId = teacherId,
            Title = createDto.Title,
            Description = createDto.Description,
            ThumbnailUrl = createDto.ThumbnailUrl,
            Price = createDto.Price,
            Category = createDto.Category,
            Level = createDto.Level,
            IsPaid = createDto.IsPaid,
            AccessCode = createDto.AccessCode ?? string.Empty,
            IsPublished = false,
            CreatedAt = DateTime.UtcNow
        };
        
        var createdCourse = await _courseRepository.AddAsync(course);
        var courseDto = MapToCourseDto(createdCourse);
        return CreatedAtAction(nameof(GetById), new { id = createdCourse.Id }, courseDto);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Teacher")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateCourseDto updateDto)
    {
        var existingCourse = await _courseRepository.GetByIdAsync(id);
        if (existingCourse == null)
        {
            return NotFound(new { message = "Course not found" });
        }

        existingCourse.Title = updateDto.Title;
        existingCourse.Description = updateDto.Description;
        existingCourse.ThumbnailUrl = updateDto.ThumbnailUrl;
        existingCourse.Price = updateDto.Price;
        existingCourse.Category = updateDto.Category;
        existingCourse.Level = updateDto.Level;
        existingCourse.IsPublished = updateDto.IsPublished;
        existingCourse.IsPaid = updateDto.IsPaid;
        existingCourse.AccessCode = updateDto.AccessCode ?? string.Empty;
        existingCourse.UpdatedAt = DateTime.UtcNow;
        
        await _courseRepository.UpdateAsync(existingCourse);
        var courseDto = MapToCourseDto(existingCourse);
        return Ok(courseDto);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Teacher")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _courseRepository.DeleteAsync(id);
        return NoContent();
    }

    private static CourseDto MapToCourseDto(Course course)
    {
        return new CourseDto
        {
            Id = course.Id,
            TeacherId = course.TeacherId,
            TeacherName = course.Teacher?.User?.FirstName + " " + course.Teacher?.User?.LastName ?? "",
            Title = course.Title,
            Description = course.Description,
            ThumbnailUrl = course.ThumbnailUrl,
            Price = course.Price,
            Category = course.Category,
            Level = course.Level,
            Duration = course.Duration,
            IsPublished = course.IsPublished,
            IsPaid = course.IsPaid,
            AccessCode = course.AccessCode,
            CreatedAt = course.CreatedAt,
            TotalVideos = course.Videos?.Count ?? 0,
            TotalStudents = course.Enrollments?.Count ?? 0
        };
    }
}
