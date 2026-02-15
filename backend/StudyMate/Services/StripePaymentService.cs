using Stripe;
using Stripe.Checkout;
using StudyMate.Interfaces;
using StudyMate.Models;

namespace StudyMate.Services;

public class StripePaymentService : IPaymentService
{
    private readonly IConfiguration _configuration;
    private readonly IPaymentRepository _paymentRepository;
    private readonly ICourseRepository _courseRepository;
    private readonly ILogger<StripePaymentService> _logger;

    public StripePaymentService(
        IConfiguration configuration,
        IPaymentRepository paymentRepository,
        ICourseRepository courseRepository,
        ILogger<StripePaymentService> logger)
    {
        _configuration = configuration;
        _paymentRepository = paymentRepository;
        _courseRepository = courseRepository;
        _logger = logger;

        var stripeKey = _configuration["Stripe:SecretKey"];
        if (!string.IsNullOrEmpty(stripeKey))
        {
            StripeConfiguration.ApiKey = stripeKey;
        }
    }

    public async Task<PaymentIntentResponse> CreatePaymentIntentAsync(Guid courseId, Guid studentId, decimal amount)
    {
        try
        {
            var course = await _courseRepository.GetByIdAsync(courseId);
            if (course == null)
            {
                throw new InvalidOperationException("Course not found");
            }

            // Amount in cents for Stripe
            var amountInCents = (long)(amount * 100);

            var options = new PaymentIntentCreateOptions
            {
                Amount = amountInCents,
                Currency = "usd",
                PaymentMethodTypes = new List<string> { "card" },
                Metadata = new Dictionary<string, string>
                {
                    { "courseId", courseId.ToString() },
                    { "studentId", studentId.ToString() },
                    { "courseName", course.Title }
                },
                Description = $"Purchase of course: {course.Title}"
            };

            var service = new PaymentIntentService();
            var paymentIntent = await service.CreateAsync(options);

            // Save payment record
            var payment = new Payment
            {
                Id = Guid.NewGuid(),
                StudentId = studentId,
                CourseId = courseId,
                Amount = amount,
                Currency = "USD",
                PaymentMethod = "Stripe",
                TransactionId = paymentIntent.Id,
                Status = ConvertStripeStatusToPaymentStatus(paymentIntent.Status),
                CreatedAt = DateTime.UtcNow
            };

            await _paymentRepository.AddAsync(payment);

            return new PaymentIntentResponse
            {
                ClientSecret = paymentIntent.ClientSecret ?? "",
                PaymentIntentId = paymentIntent.Id,
                Amount = amount,
                Currency = "usd",
                Status = paymentIntent.Status
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error creating payment intent for course {courseId} and student {studentId}");
            throw;
        }
    }

    public async Task<bool> ConfirmPaymentAsync(string paymentIntentId)
    {
        try
        {
            var service = new PaymentIntentService();
            var paymentIntent = await service.GetAsync(paymentIntentId);

            if (paymentIntent.Status == "succeeded")
            {
                // Get metadata to find the payment record
                if (paymentIntent.Metadata.TryGetValue("studentId", out var studentIdStr) &&
                    paymentIntent.Metadata.TryGetValue("courseId", out var courseIdStr) &&
                    Guid.TryParse(studentIdStr, out var studentId) &&
                    Guid.TryParse(courseIdStr, out var courseId))
                {
                    var payments = await _paymentRepository.GetByStudentIdAsync(studentId);
                    var payment = payments.FirstOrDefault(p => p.TransactionId == paymentIntentId);
                    
                    if (payment != null)
                    {
                        payment.Status = PaymentStatus.Completed;
                        payment.UpdatedAt = DateTime.UtcNow;
                        await _paymentRepository.UpdateAsync(payment);

                        _logger.LogInformation($"Payment {paymentIntentId} confirmed. Should create enrollment for student {studentId} in course {courseId}");
                    }
                }

                return true;
            }

            return false;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error confirming payment {paymentIntentId}");
            throw;
        }
    }

    public async Task<Models.PaymentStatus> GetPaymentStatusAsync(string paymentIntentId)
    {
        try
        {
            var service = new PaymentIntentService();
            var paymentIntent = await service.GetAsync(paymentIntentId);

            return ConvertStripeStatusToPaymentStatus(paymentIntent.Status);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error getting payment status for {paymentIntentId}");
            throw;
        }
    }

    public async Task HandleWebhookAsync(string json, string signature)
    {
        try
        {
            var webhookSecret = _configuration["Stripe:WebhookSecret"];
            var stripeEvent = EventUtility.ConstructEvent(json, signature, webhookSecret);

            switch (stripeEvent.Type)
            {
                case Events.PaymentIntentSucceeded:
                    var paymentIntent = stripeEvent.Data.Object as PaymentIntent;
                    if (paymentIntent != null)
                    {
                        await ConfirmPaymentAsync(paymentIntent.Id);
                        _logger.LogInformation($"Payment intent succeeded: {paymentIntent.Id}");
                    }
                    break;

                case Events.PaymentIntentPaymentFailed:
                    var failedIntent = stripeEvent.Data.Object as PaymentIntent;
                    if (failedIntent != null)
                    {
                        if (failedIntent.Metadata.TryGetValue("studentId", out var studentIdStr) &&
                            Guid.TryParse(studentIdStr, out var studentId))
                        {
                            var payments = await _paymentRepository.GetByStudentIdAsync(studentId);
                            var payment = payments.FirstOrDefault(p => p.TransactionId == failedIntent.Id);
                            
                            if (payment != null)
                            {
                                payment.Status = PaymentStatus.Failed;
                                payment.FailureReason = failedIntent.LastPaymentError?.Message;
                                payment.UpdatedAt = DateTime.UtcNow;
                                await _paymentRepository.UpdateAsync(payment);
                            }
                        }
                        _logger.LogWarning($"Payment intent failed: {failedIntent.Id}");
                    }
                    break;
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error handling Stripe webhook");
            throw;
        }
    }

    private PaymentStatus ConvertStripeStatusToPaymentStatus(string stripeStatus)
    {
        return stripeStatus switch
        {
            "requires_payment_method" => PaymentStatus.Pending,
            "processing" => PaymentStatus.Pending,
            "succeeded" => PaymentStatus.Completed,
            "canceled" => PaymentStatus.Failed,
            _ => PaymentStatus.Pending
        };
    }
}
