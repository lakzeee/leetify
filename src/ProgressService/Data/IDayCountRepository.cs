using ProgressService.Dtos;
using ProgressService.Entities;

namespace ProgressService.Data;

public interface IDayCountRepository
{
    Task<List<DayCountDto>> GetDayCountsByUserSub(string userSub);

    void AddDayCount(string userSub);
    Task<bool> SaveChangesAsync();
}