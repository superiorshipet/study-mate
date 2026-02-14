namespace StudyMate.DTOs;

public class CourseDto
{
    public Guid Id { get; set; }
    public Guid TeacherId { get; set; }
    public string TeacherName { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string ThumbnailUrl { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string Category { get; set; } = string.Empty;
    public string Level { get; set; } = "Beginner";
    public int Duration { get; set; }
    public bool IsPublished { get; set; }
    public bool IsPaid { get; set; }
    public string? AccessCode { get; set; }
    public DateTime CreatedAt { get; set; }
    public int TotalVideos { get; set; }
    public int TotalStudents { get; set; }
}

public class CreateCourseDto
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string ThumbnailUrl { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string Category { get; set; } = string.Empty;
    public string Level { get; set; } = "Beginner";
    public bool IsPaid { get; set; }
    public string? AccessCode { get; set; }
}

public class UpdateCourseDto
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string ThumbnailUrl { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string Category { get; set; } = string.Empty;
    public string Level { get; set; } = "Beginner";
    public bool IsPublished { get; set; }
    public bool IsPaid { get; set; }
    public string? AccessCode { get; set; }
}
