using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudyMate.DTOs;
using StudyMate.Models;
using StudyMate.Interfaces;

namespace StudyMate.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class PaymentsController : ControllerBase
{
    private readonly IPaymentRepository _paymentRepository;

    public PaymentsController(IPaymentRepository paymentRepository)
    {
        _paymentRepository = paymentRepository;
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
