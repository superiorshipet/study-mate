using StudyMate.Models;

namespace StudyMate.Interfaces;

public interface ICourseRepository
{
    Task<Course?> GetByIdAsync(Guid id);
    Task<IEnumerable<Course>> GetAllAsync();
    Task<IEnumerable<Course>> GetByTeacherIdAsync(Guid teacherId);
    Task<IEnumerable<Course>> GetPublishedCoursesAsync();
    Task<Course> AddAsync(Course course);
    Task UpdateAsync(Course course);
    Task DeleteAsync(Guid id);
}
