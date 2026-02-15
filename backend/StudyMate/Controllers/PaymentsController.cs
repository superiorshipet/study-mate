using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudyMate.DTOs;
using StudyMate.Models;
using StudyMate.Interfaces;
using System.Security.Claims;

namespace StudyMate.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PaymentsController : ControllerBase
{
    private readonly IPaymentRepository _paymentRepository;
    private readonly ICourseRepository _courseRepository;
    private readonly IUserRepository _userRepository;

    public PaymentsController(
        IPaymentRepository paymentRepository,
        ICourseRepository courseRepository,
        IUserRepository userRepository)
    {
        _paymentRepository = paymentRepository;
        _courseRepository = courseRepository;
        _userRepository = userRepository;
    }

    [HttpGet("student/{studentId}")]
    [Authorize(Roles = "Student")]
    public async Task<IActionResult> GetByStudentId(Guid studentId)
    {
        var payments = await _paymentRepository.GetByStudentIdAsync(studentId);
        var paymentDtos = payments.Select(MapToPaymentDto).ToList();
        return Ok(paymentDtos);
    }

    [HttpGet("course/{courseId}")]
    [Authorize(Roles = "Teacher")]
    public async Task<IActionResult> GetByCourseId(Guid courseId)
    {
        var payments = await _paymentRepository.GetByCourseIdAsync(courseId);
        var paymentDtos = payments.Select(MapToPaymentDto).ToList();
        return Ok(paymentDtos);
    }

    [HttpGet("teacher-earnings")]
    [Authorize(Roles = "Teacher")]
    public async Task<IActionResult> GetTeacherEarnings()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out var teacherId))
        {
            return Unauthorized();
        }

        // Get all courses for this teacher
        var courses = await _courseRepository.GetByTeacherIdAsync(teacherId);
        var courseIds = courses.Select(c => c.Id).ToList();

        // Get all payments for these courses
        var totalEarnings = decimal.Zero;
        var thisMonthEarnings = decimal.Zero;
        var currentDate = DateTime.UtcNow;
        var monthStart = new DateTime(currentDate.Year, currentDate.Month, 1);

        foreach (var courseId in courseIds)
        {
            var payments = await _paymentRepository.GetByCourseIdAsync(courseId);
            var successfulPayments = payments.Where(p => p.Status == PaymentStatus.Completed);
            
            foreach (var payment in successfulPayments)
            {
                totalEarnings += payment.Amount;
                if (payment.CreatedAt >= monthStart)
                {
                    thisMonthEarnings += payment.Amount;
                }
            }
        }

        var earningsDto = new TeacherEarningsDto
        {
            TotalEarnings = totalEarnings,
            ThisMonthEarnings = thisMonthEarnings,
            TotalTransactions = courseIds.Count
        };

        return Ok(earningsDto);
    }

    [HttpGet("history")]
    [Authorize(Roles = "Teacher")]
    public async Task<IActionResult> GetPaymentHistory()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out var teacherId))
        {
            return Unauthorized();
        }

        // Get all courses for this teacher
        var courses = await _courseRepository.GetByTeacherIdAsync(teacherId);
        var courseIds = courses.Select(c => c.Id).ToList();

        var historyList = new List<PaymentHistoryDto>();

        foreach (var courseId in courseIds)
        {
            var course = await _courseRepository.GetByIdAsync(courseId);
            var payments = await _paymentRepository.GetByCourseIdAsync(courseId);

            foreach (var payment in payments.Where(p => p.Status == PaymentStatus.Completed))
            {
                var student = await _userRepository.GetByIdAsync(payment.StudentId);
                historyList.Add(new PaymentHistoryDto
                {
                    Id = payment.Id,
                    CourseTitle = course?.Title ?? "Unknown",
                    StudentName = student != null ? $"{student.FirstName} {student.LastName}" : "Unknown",
                    Amount = payment.Amount,
                    Status = payment.Status.ToString(),
                    CreatedAt = payment.CreatedAt
                });
            }
        }

        return Ok(historyList.OrderByDescending(h => h.CreatedAt));
    }

    [HttpGet("{id}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetById(Guid id)
    {
        var payment = await _paymentRepository.GetByIdAsync(id);
        if (payment == null)
        {
            return NotFound(new { message = "Payment not found" });
        }
        var paymentDto = MapToPaymentDto(payment);
        return Ok(paymentDto);
    }

    [HttpPost]
    [Authorize(Roles = "Student")]
    public async Task<IActionResult> Create([FromBody] CreatePaymentDto createDto)
    {
        var payment = new Payment
        {
            Id = Guid.NewGuid(),
            StudentId = createDto.StudentId,
            CourseId = createDto.CourseId,
            Amount = createDto.Amount,
            Currency = createDto.Currency,
            PaymentMethod = createDto.PaymentMethod,
            TransactionId = createDto.TransactionId,
            Status = PaymentStatus.Pending,
            CreatedAt = DateTime.UtcNow
        };
        
        var createdPayment = await _paymentRepository.AddAsync(payment);
        var paymentDto = MapToPaymentDto(createdPayment);
        return CreatedAtAction(nameof(GetById), new { id = createdPayment.Id }, paymentDto);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Teacher")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdatePaymentDto updateDto)
    {
        var existingPayment = await _paymentRepository.GetByIdAsync(id);
        if (existingPayment == null)
        {
            return NotFound(new { message = "Payment not found" });
        }

        if (Enum.TryParse<PaymentStatus>(updateDto.Status, true, out var status))
        {
            existingPayment.Status = status;
        }
        else
        {
            return BadRequest(new { message = "Invalid payment status" });
        }

        existingPayment.FailureReason = updateDto.FailureReason;
        existingPayment.UpdatedAt = DateTime.UtcNow;
        
        await _paymentRepository.UpdateAsync(existingPayment);
        var paymentDto = MapToPaymentDto(existingPayment);
        return Ok(paymentDto);
    }

    private static PaymentDto MapToPaymentDto(Payment payment)
    {
        return new PaymentDto
        {
            Id = payment.Id,
            StudentId = payment.StudentId,
            CourseId = payment.CourseId,
            Amount = payment.Amount,
            Currency = payment.Currency,
            Status = payment.Status.ToString(),
            PaymentMethod = payment.PaymentMethod,
            TransactionId = payment.TransactionId,
            FailureReason = payment.FailureReason,
            CreatedAt = payment.CreatedAt
        };
    }
}
