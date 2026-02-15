namespace StudyMate.Services;

public interface IPaymentService
{
    Task<PaymentIntentResponse> CreatePaymentIntentAsync(Guid courseId, Guid studentId, decimal amount);
    Task<bool> ConfirmPaymentAsync(string paymentIntentId);
    Task<Models.PaymentStatus> GetPaymentStatusAsync(string paymentIntentId);
    Task HandleWebhookAsync(string json, string signature);
}

public class PaymentIntentResponse
{
    public string ClientSecret { get; set; } = string.Empty;
    public string PaymentIntentId { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public string Currency { get; set; } = "usd";
    public string Status { get; set; } = string.Empty;
}
