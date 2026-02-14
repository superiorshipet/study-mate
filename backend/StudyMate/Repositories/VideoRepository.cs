using Microsoft.EntityFrameworkCore;
using StudyMate.Models;
using StudyMate.Interfaces;
using StudyMate.Data;

namespace StudyMate.Repositories;

public class VideoRepository : Repository<Video>, IVideoRepository
{
    public VideoRepository(StudyMateDbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<Video>> GetByCourseIdAsync(Guid courseId)
    {
        return await _dbSet
            .Where(v => v.CourseId == courseId)
            .OrderBy(v => v.Order)
            .ToListAsync();
    }

    public override async Task<Video?> GetByIdAsync(Guid id)
    {
        return await _dbSet
            .Include(v => v.Course)
            .FirstOrDefaultAsync(v => v.Id == id);
    }
}
