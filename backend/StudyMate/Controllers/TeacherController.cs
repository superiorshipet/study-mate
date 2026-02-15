using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudyMate.DTOs;
using StudyMate.Interfaces;
using System.Security.Claims;

namespace StudyMate.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Teacher")]
public class TeacherController : ControllerBase
{
    private readonly IUserRepository _userRepository;
    private readonly ICourseRepository _courseRepository;
    private readonly IVideoRepository _videoRepository;
    private readonly IPaymentRepository _paymentRepository;

    public TeacherController(
        IUserRepository userRepository,
        ICourseRepository courseRepository,
        IVideoRepository videoRepository,
        IPaymentRepository paymentRepository)
    {
        _userRepository = userRepository;
        _courseRepository = courseRepository;
        _videoRepository = videoRepository;
        _paymentRepository = paymentRepository;
    }

    [HttpGet("stats")]
    public async Task<IActionResult> GetTeacherStats()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out var teacherId))
        {
            return Unauthorized();
        }

        var user = await _userRepository.GetByIdAsync(teacherId);
        if (user == null || user.TeacherProfile == null)
        {
            return NotFound(new { message = "Teacher profile not found" });
        }

        var statsDto = new TeacherStatsDto
        {
            TotalStudents = user.TeacherProfile.TotalStudents,
            TotalEarnings = user.TeacherProfile.TotalEarnings,
            TotalVideos = 0, // Would need to count videos from courses
            TotalCourses = user.TeacherProfile.TotalCourses,
            Rating = user.TeacherProfile.Rating
        };

        return Ok(statsDto);
    }

    [HttpGet("courses")]
    public async Task<IActionResult> GetCourses()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out var teacherId))
        {
            return Unauthorized();
        }

        var courses = await _courseRepository.GetByTeacherIdAsync(teacherId);
        return Ok(courses);
    }

    [HttpGet("videos")]
    public async Task<IActionResult> GetVideos()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out var teacherId))
        {
            return Unauthorized();
        }

        var courses = await _courseRepository.GetByTeacherIdAsync(teacherId);
        var videos = new List<object>();

        foreach (var course in courses)
        {
            var courseVideos = await _videoRepository.GetByCourseIdAsync(course.Id);
            foreach (var video in courseVideos)
            {
                videos.Add(new
                {
                    video.Id,
                    video.Title,
                    video.Duration,
                    CourseTitle = course.Title,
                    video.CreatedAt
                });
            }
        }

        return Ok(videos);
    }
}
