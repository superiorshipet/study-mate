using Microsoft.EntityFrameworkCore;
using StudyMate.Models;
using StudyMate.Interfaces;
using StudyMate.Data;

namespace StudyMate.Repositories;

public class EnrollmentRepository : Repository<Enrollment>, IEnrollmentRepository
{
    public EnrollmentRepository(StudyMateDbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<Enrollment>> GetByStudentIdAsync(Guid studentId)
    {
        return await _dbSet
            .Include(e => e.Course)
            .Where(e => e.StudentId == studentId)
            .ToListAsync();
    }

    public async Task<IEnumerable<Enrollment>> GetByCourseIdAsync(Guid courseId)
    {
        return await _dbSet
            .Include(e => e.Student)
            .Where(e => e.CourseId == courseId)
            .ToListAsync();
    }

    public async Task<Enrollment?> GetByStudentAndCourseAsync(Guid studentId, Guid courseId)
    {
        return await _dbSet
            .FirstOrDefaultAsync(e => e.StudentId == studentId && e.CourseId == courseId);
    }
}
