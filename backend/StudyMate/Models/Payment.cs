namespace StudyMate.Models;

public class Payment
{
    public Guid Id { get; set; }
    public Guid StudentId { get; set; }
    public Guid CourseId { get; set; }
    public decimal Amount { get; set; }
    public string Currency { get; set; } = "USD";
    public PaymentStatus Status { get; set; }
    public string PaymentMethod { get; set; } = string.Empty;
    public string TransactionId { get; set; } = string.Empty;
    public string? FailureReason { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    
    // Navigation properties
    public StudentProfile Student { get; set; } = null!;
    public Course Course { get; set; } = null!;
}

public enum PaymentStatus
{
    Pending,
    Completed,
    Failed,
    Refunded
}
