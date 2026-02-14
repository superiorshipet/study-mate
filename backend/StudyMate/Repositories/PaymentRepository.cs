using Microsoft.EntityFrameworkCore;
using StudyMate.Models;
using StudyMate.Interfaces;
using StudyMate.Data;

namespace StudyMate.Repositories;

public class PaymentRepository : Repository<Payment>, IPaymentRepository
{
    public PaymentRepository(StudyMateDbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<Payment>> GetByStudentIdAsync(Guid studentId)
    {
        return await _dbSet
            .Include(p => p.Course)
            .Where(p => p.StudentId == studentId)
            .ToListAsync();
    }

    public async Task<IEnumerable<Payment>> GetByCourseIdAsync(Guid courseId)
    {
        return await _dbSet
            .Include(p => p.Student)
            .Where(p => p.CourseId == courseId)
            .ToListAsync();
    }
}
