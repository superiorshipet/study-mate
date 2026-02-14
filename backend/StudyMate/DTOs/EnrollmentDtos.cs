namespace StudyMate.DTOs;

public class EnrollmentDto
{
    public Guid Id { get; set; }
    public Guid StudentId { get; set; }
    public Guid CourseId { get; set; }
    public string CourseTitle { get; set; } = string.Empty;
    public DateTime EnrolledAt { get; set; }
    public DateTime? CompletedAt { get; set; }
    public int ProgressPercentage { get; set; }
    public bool IsCompleted { get; set; }
}

public class CreateEnrollmentDto
{
    public Guid StudentId { get; set; }
    public Guid CourseId { get; set; }
}

public class UpdateEnrollmentDto
{
    public int ProgressPercentage { get; set; }
    public bool IsCompleted { get; set; }
}
