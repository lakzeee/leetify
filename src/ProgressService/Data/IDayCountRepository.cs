using ProgressService.Dtos;
using ProgressService.Entities;

namespace ProgressService.Data;

public interface IDayCountRepository
{
    Task<List<DayCountDto>> GetDayCountsByUserSub(string userSub);
    void AddDayCount();
    Task<bool> SaveChangesAsync();
}