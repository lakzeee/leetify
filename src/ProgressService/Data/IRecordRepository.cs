using ProgressService.Dtos;
using ProgressService.Entities;

namespace ProgressService.Data;

public interface IRecordRepository
{
    Task<List<RecordDto>> GetRecordListByLeetCodeNoAsync(string userSub, List<int> nos);
    Task<Record> GetRecordEntityByIdAsync(Guid id);
    void CreateRecord(string userSub, RecordDto recordDto);
    Task<bool> SaveChangesAsync();
}