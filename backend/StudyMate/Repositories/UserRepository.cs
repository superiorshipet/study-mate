using Microsoft.EntityFrameworkCore;
using StudyMate.Models;
using StudyMate.Interfaces;
using StudyMate.Data;

namespace StudyMate.Repositories;

public class UserRepository : Repository<User>, IUserRepository
{
    public UserRepository(StudyMateDbContext context) : base(context)
    {
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        return await _dbSet.FirstOrDefaultAsync(u => u.Email == email);
    }

    public override async Task<User?> GetByIdAsync(Guid id)
    {
        return await _dbSet
            .Include(u => u.TeacherProfile)
            .Include(u => u.StudentProfile)
            .FirstOrDefaultAsync(u => u.Id == id);
    }
}
