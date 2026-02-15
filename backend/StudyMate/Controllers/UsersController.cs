using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudyMate.DTOs;
using StudyMate.Interfaces;
using System.Security.Claims;

namespace StudyMate.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserRepository _userRepository;
    private readonly ICourseRepository _courseRepository;
    private readonly IVideoRepository _videoRepository;
    private readonly IPaymentRepository _paymentRepository;

    public UsersController(
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

    [HttpGet("profile")]
    [Authorize]
    public async Task<IActionResult> GetProfile()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out var userId))
        {
            return Unauthorized();
        }

        var user = await _userRepository.GetByIdAsync(userId);
        if (user == null)
        {
            return NotFound(new { message = "User not found" });
        }

        var profileDto = new UserProfileDto
        {
            Id = user.Id,
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Bio = user.TeacherProfile?.Bio ?? "",
            ProfilePictureUrl = user.TeacherProfile?.ProfilePictureUrl ?? "",
            Role = user.Role.ToString(),
            CreatedAt = user.CreatedAt
        };

        return Ok(profileDto);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById(Guid id)
    {
        var user = await _userRepository.GetByIdAsync(id);
        if (user == null)
        {
            return NotFound(new { message = "User not found" });
        }

        var profileDto = new UserProfileDto
        {
            Id = user.Id,
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Bio = user.TeacherProfile?.Bio ?? "",
            ProfilePictureUrl = user.TeacherProfile?.ProfilePictureUrl ?? "",
            Role = user.Role.ToString(),
            CreatedAt = user.CreatedAt
        };

        return Ok(profileDto);
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> UpdateProfile(Guid id, [FromBody] UpdateUserProfileDto updateDto)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out var userId))
        {
            return Unauthorized();
        }

        // Only allow users to update their own profile
        if (userId != id)
        {
            return Forbid();
        }

        var user = await _userRepository.GetByIdAsync(id);
        if (user == null)
        {
            return NotFound(new { message = "User not found" });
        }

        user.FirstName = updateDto.FirstName;
        user.LastName = updateDto.LastName;
        user.UpdatedAt = DateTime.UtcNow;

        if (user.TeacherProfile != null)
        {
            user.TeacherProfile.Bio = updateDto.Bio;
            user.TeacherProfile.ProfilePictureUrl = updateDto.ProfilePictureUrl;
        }

        await _userRepository.UpdateAsync(user);

        var profileDto = new UserProfileDto
        {
            Id = user.Id,
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Bio = user.TeacherProfile?.Bio ?? "",
            ProfilePictureUrl = user.TeacherProfile?.ProfilePictureUrl ?? "",
            Role = user.Role.ToString(),
            CreatedAt = user.CreatedAt
        };

        return Ok(profileDto);
    }
}
