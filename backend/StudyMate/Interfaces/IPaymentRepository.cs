using StudyMate.Models;

namespace StudyMate.Interfaces;

public interface IPaymentRepository
{
    Task<Payment?> GetByIdAsync(Guid id);
    Task<IEnumerable<Payment>> GetByStudentIdAsync(Guid studentId);
    Task<IEnumerable<Payment>> GetByCourseIdAsync(Guid courseId);
    Task<Payment> AddAsync(Payment payment);
    Task UpdateAsync(Payment payment);
}
