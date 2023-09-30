using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ProgressService.Dtos;
using ProgressService.Entities;
namespace ProgressService.Data.Impl;

public class RecordRepository : IRecordRepository
{
    private readonly ProgressDbContext _context;
    private readonly IMapper _mapper;

    public RecordRepository(ProgressDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<RecordDto>> GetRecordListByLeetCodeNoAsync(string userSub, List<int> nos)
    {
        var recordEntities = await _context.Record
            .Where(x => x.UserSub == userSub)
            .Where(x => nos.Contains(x.LeetCodeNo))
            .ToListAsync();
        return _mapper.Map<List<RecordDto>>(recordEntities);
    }

    public async Task<string> GetLeetCodeNosByUserSubAndColumn(string userSub, string columnId)
    {
        var recordEntities = await _context.Record
            .Where(x => x.UserSub == userSub)
            .Where(x => x.ColumnId == columnId)
            .ToListAsync();
        var leetCodeNos = recordEntities.Select(x => x.LeetCodeNo).ToList();
        return string.Join(",", leetCodeNos);
    }

    public async Task<List<Record>> GetGetMostRecentUserRecord(string userSub, int number)
    {
        return await _context.Record
            .Where(x => x.UserSub == userSub)
            .OrderByDescending(x => x.UpdatedAt)
            .Take(number)
            .ToListAsync();
    }

    public async Task<Record> GetRecordEntityByIdAsync(string id)
    {
        return await _context.Record.FirstOrDefaultAsync(x => x.Id == new Guid(id));
    }

    public async Task<Record> GetRecordEntityByLeetCodeNoAndUserSub(int leetCodeNo, string userSub)
    {
        return await _context.Record
            .Where(r => r.LeetCodeNo == leetCodeNo && r.UserSub == userSub)
            .FirstOrDefaultAsync();
    }

    public void CreateRecord(string userSub, RecordDto recordDto)
    {
        var record = _mapper.Map<Record>(recordDto);
        record.UserSub = userSub;
        record.CreatedAt = DateTime.UtcNow;
        record.UpdatedAt = DateTime.UtcNow;
        _context.Record.Add(record);
    }

    public async Task<bool> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }
}