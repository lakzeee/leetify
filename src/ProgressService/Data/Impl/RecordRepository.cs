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

    public async Task<Record> GetRecordEntityByIdAsync(Guid id)
    {
        return await _context.Record.FirstOrDefaultAsync(x => x.Id == id);
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