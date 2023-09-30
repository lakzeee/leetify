using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ProgressService.Dtos;
using ProgressService.Entities;

namespace ProgressService.Data.Impl;

public class DayCountRepository : IDayCountRepository
{
    private readonly ProgressDbContext _dbContext;
    private readonly IMapper _mapper;

    public DayCountRepository(ProgressDbContext dbContext, IMapper mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }

    public async Task<List<DayCountDto>> GetDayCountsByUserSub(string userSub)
    {
        var dayCounts = await _dbContext.DayCounts.Where(d => d.UserSub == userSub).ToListAsync();
        return _mapper.Map<List<DayCountDto>>(dayCounts);
    }

    public async Task AddDayCount(string userSub)
    {
        var currentDate = DateTime.UtcNow.Date;
        var existRecord =
            await _dbContext.DayCounts.FirstOrDefaultAsync(d => d.UserSub == userSub && d.CreatedAt == currentDate);
        if (existRecord != null)
        {
            existRecord.Count++;
        }
        else
        {
            var newRecord = new DayCount
            {
                UserSub = userSub,
                CreatedAt = currentDate,
                Count = 1
            };
            _dbContext.DayCounts.Add(newRecord);
        }
    }

    public async Task<bool> SaveChangesAsync()
    {
        return await _dbContext.SaveChangesAsync() > 0;
    }
}