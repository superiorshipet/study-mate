using Microsoft.EntityFrameworkCore;
using StudyMate.Models;
using StudyMate.Interfaces;
using StudyMate.Data;

namespace StudyMate.Repositories;

public class CourseRepository : Repository<Course>, ICourseRepository
{
    public CourseRepository(StudyMateDbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<Course>> GetByTeacherIdAsync(Guid teacherId)
    {
        return await _dbSet
            .Include(c => c.Teacher)
            .Where(c => c.TeacherId == teacherId)
            .ToListAsync();
    }

    public async Task<IEnumerable<Course>> GetPublishedCoursesAsync()
    {
        return await _dbSet
            .Include(c => c.Teacher)
            .Where(c => c.IsPublished)
            .ToListAsync();
    }

    public override async Task<Course?> GetByIdAsync(Guid id)
    {
        return await _dbSet
            .Include(c => c.Teacher)
            .Include(c => c.Videos)
            .Include(c => c.Enrollments)
            .FirstOrDefaultAsync(c => c.Id == id);
    }
}
