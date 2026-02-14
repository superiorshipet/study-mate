namespace StudyMate.Models;

public class Enrollment
{
    public Guid Id { get; set; }
    public Guid StudentId { get; set; }
    public Guid CourseId { get; set; }
    public DateTime EnrolledAt { get; set; }
    public DateTime? CompletedAt { get; set; }
    public int ProgressPercentage { get; set; }
    public bool IsCompleted { get; set; }
    
    // Navigation properties
    public StudentProfile Student { get; set; } = null!;
    public Course Course { get; set; } = null!;
}
