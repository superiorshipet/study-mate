namespace StudyMate.Models;

public class Course
{
    public Guid Id { get; set; }
    public Guid TeacherId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string ThumbnailUrl { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string Category { get; set; } = string.Empty;
    public string Level { get; set; } = "Beginner";
    public int Duration { get; set; } // in minutes
    public bool IsPublished { get; set; }
    public bool IsPaid { get; set; }
    public string AccessCode { get; set; } = string.Empty; // For free access courses
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    
    // Navigation properties
    public TeacherProfile Teacher { get; set; } = null!;
    public ICollection<Video> Videos { get; set; } = new List<Video>();
    public ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
}
