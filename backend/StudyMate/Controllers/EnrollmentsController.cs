using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudyMate.DTOs;
using StudyMate.Models;
using StudyMate.Interfaces;

namespace StudyMate.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class EnrollmentsController : ControllerBase
{
    private readonly IEnrollmentRepository _enrollmentRepository;

    public EnrollmentsController(IEnrollmentRepository enrollmentRepository)
    {
        _enrollmentRepository = enrollmentRepository;
    }

    [HttpGet("student/{studentId}")]
    [Authorize(Roles = "Student")]
    public async Task<IActionResult> GetByStudentId(Guid studentId)
    {
        var enrollments = await _enrollmentRepository.GetByStudentIdAsync(studentId);
        var enrollmentDtos = enrollments.Select(MapToEnrollmentDto).ToList();
        return Ok(enrollmentDtos);
    }

    [HttpGet("course/{courseId}")]
    [Authorize(Roles = "Teacher")]
    public async Task<IActionResult> GetByCourseId(Guid courseId)
    {
        var enrollments = await _enrollmentRepository.GetByCourseIdAsync(courseId);
        var enrollmentDtos = enrollments.Select(MapToEnrollmentDto).ToList();
        return Ok(enrollmentDtos);
    }

    [HttpGet("{id}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetById(Guid id)
    {
        var enrollment = await _enrollmentRepository.GetByIdAsync(id);
        if (enrollment == null)
        {
            return NotFound(new { message = "Enrollment not found" });
        }
        var enrollmentDto = MapToEnrollmentDto(enrollment);
        return Ok(enrollmentDto);
    }

    [HttpPost]
    [Authorize(Roles = "Student")]
    public async Task<IActionResult> Create([FromBody] CreateEnrollmentDto createDto)
    {
        var existingEnrollment = await _enrollmentRepository.GetByStudentAndCourseAsync(createDto.StudentId, createDto.CourseId);
        if (existingEnrollment != null)
        {
            return BadRequest(new { message = "Already enrolled in this course" });
        }

        var enrollment = new Enrollment
        {
            Id = Guid.NewGuid(),
            StudentId = createDto.StudentId,
            CourseId = createDto.CourseId,
            EnrolledAt = DateTime.UtcNow,
            IsCompleted = false,
            ProgressPercentage = 0
        };
        
        var createdEnrollment = await _enrollmentRepository.AddAsync(enrollment);
        var enrollmentDto = MapToEnrollmentDto(createdEnrollment);
        return CreatedAtAction(nameof(GetById), new { id = createdEnrollment.Id }, enrollmentDto);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Student")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateEnrollmentDto updateDto)
    {
        var existingEnrollment = await _enrollmentRepository.GetByIdAsync(id);
        if (existingEnrollment == null)
        {
            return NotFound(new { message = "Enrollment not found" });
        }

        existingEnrollment.ProgressPercentage = updateDto.ProgressPercentage;
        existingEnrollment.IsCompleted = updateDto.IsCompleted;
        if (updateDto.IsCompleted)
        {
            existingEnrollment.CompletedAt = DateTime.UtcNow;
        }
        
        await _enrollmentRepository.UpdateAsync(existingEnrollment);
        var enrollmentDto = MapToEnrollmentDto(existingEnrollment);
        return Ok(enrollmentDto);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Student")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _enrollmentRepository.DeleteAsync(id);
        return NoContent();
    }

    private static EnrollmentDto MapToEnrollmentDto(Enrollment enrollment)
    {
        return new EnrollmentDto
        {
            Id = enrollment.Id,
            StudentId = enrollment.StudentId,
            CourseId = enrollment.CourseId,
            EnrolledAt = enrollment.EnrolledAt,
            CompletedAt = enrollment.CompletedAt,
            ProgressPercentage = enrollment.ProgressPercentage,
            IsCompleted = enrollment.IsCompleted
        };
    }
}
