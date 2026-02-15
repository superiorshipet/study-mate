using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudyMate.DTOs;
using StudyMate.Services;

namespace StudyMate.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class PaymentCheckoutController : ControllerBase
{
    private readonly IPaymentService _paymentService;
    private readonly ILogger<PaymentCheckoutController> _logger;

    public PaymentCheckoutController(IPaymentService paymentService, ILogger<PaymentCheckoutController> logger)
    {
        _paymentService = paymentService;
        _logger = logger;
    }

    [HttpPost("create-intent")]
    [Authorize(Roles = "Student")]
    public async Task<IActionResult> CreatePaymentIntent([FromBody] CreatePaymentIntentRequest request)
    {
        try
        {
            if (request.Amount <= 0)
            {
                return BadRequest(new { message = "Amount must be greater than 0" });
            }

            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (!Guid.TryParse(userIdClaim, out var studentId))
            {
                return BadRequest(new { message = "Invalid user context" });
            }

            var result = await _paymentService.CreatePaymentIntentAsync(request.CourseId, studentId, request.Amount);

            return Ok(new
            {
                clientSecret = result.ClientSecret,
                paymentIntentId = result.PaymentIntentId,
                amount = result.Amount,
                currency = result.Currency
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating payment intent");
            return StatusCode(500, new { message = "Error creating payment intent", error = ex.Message });
        }
    }

    [HttpPost("confirm")]
    [Authorize(Roles = "Student")]
    public async Task<IActionResult> ConfirmPayment([FromBody] ConfirmPaymentRequest request)
    {
        try
        {
            var success = await _paymentService.ConfirmPaymentAsync(request.PaymentIntentId);

            if (success)
            {
                return Ok(new { message = "Payment confirmed successfully", success = true });
            }

            return BadRequest(new { message = "Payment confirmation failed", success = false });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error confirming payment");
            return StatusCode(500, new { message = "Error confirming payment", error = ex.Message });
        }
    }

    [HttpGet("status/{paymentIntentId}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetPaymentStatus(string paymentIntentId)
    {
        try
        {
            var status = await _paymentService.GetPaymentStatusAsync(paymentIntentId);
            return Ok(new { status = status.ToString() });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting payment status");
            return StatusCode(500, new { message = "Error getting payment status", error = ex.Message });
        }
    }

    [HttpPost("webhook")]
    [AllowAnonymous]
    public async Task<IActionResult> HandleWebhook()
    {
        try
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            var signature = Request.Headers["Stripe-Signature"].ToString();

            await _paymentService.HandleWebhookAsync(json, signature);

            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error handling webhook");
            return BadRequest(new { message = "Webhook error", error = ex.Message });
        }
    }
}

public class CreatePaymentIntentRequest
{
    public Guid CourseId { get; set; }
    public decimal Amount { get; set; }
}

public class ConfirmPaymentRequest
{
    public string PaymentIntentId { get; set; } = string.Empty;
}
