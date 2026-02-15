namespace StudyMate.DTOs;

public class VideoDto
{
    public Guid Id { get; set; }
    public Guid CourseId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string VideoUrl { get; set; } = string.Empty;
    public string ThumbnailUrl { get; set; } = string.Empty;
    public int Duration { get; set; }
    public int Order { get; set; }
    public bool IsPublished { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class CreateVideoDto
{
    public Guid CourseId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string VideoUrl { get; set; } = string.Empty;
    public string ThumbnailUrl { get; set; } = string.Empty;
    public int Duration { get; set; }
    public int Order { get; set; }
    public bool IsPublished { get; set; }
}

public class UpdateVideoDto
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string VideoUrl { get; set; } = string.Empty;
    public string ThumbnailUrl { get; set; } = string.Empty;
    public int Duration { get; set; }
    public int Order { get; set; }
    public bool IsPublished { get; set; }
}
public class VideoWatchDto
{
    public Guid StudentId { get; set; }
    public Guid VideoId { get; set; }
    public int WatchedDuration { get; set; }
}

public class VideoProgressDto
{
    public Guid VideoId { get; set; }
    public int WatchedDuration { get; set; }
    public int TotalDuration { get; set; }
    public double ProgressPercentage { get; set; }
    public DateTime? LastWatchedAt { get; set; }
}

public class VideoAnalyticsDto
{
    public Guid VideoId { get; set; }
    public string Title { get; set; } = string.Empty;
    public int ViewCount { get; set; }
    public int StudentCount { get; set; }
    public double AverageCompletionPercentage { get; set; }
}

public class UpdateVideoDurationDto
{
    public int Duration { get; set; }
}