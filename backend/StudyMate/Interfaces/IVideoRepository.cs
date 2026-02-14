using StudyMate.Models;

namespace StudyMate.Interfaces;

public interface IVideoRepository
{
    Task<Video?> GetByIdAsync(Guid id);
    Task<IEnumerable<Video>> GetByCourseIdAsync(Guid courseId);
    Task<Video> AddAsync(Video video);
    Task UpdateAsync(Video video);
    Task DeleteAsync(Guid id);
}
