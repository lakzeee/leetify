using ProgressService.Dtos;
using ProgressService.Entities;

namespace ProgressService.Data;

public interface IRecordRepository
{
    Task<List<RecordDto>> GetRecordListByLeetCodeNoAsync(string userSub, List<int> nos);
    Task<string> GetLeetCodeNosByUserSub(string userSub, string columnId);
    Task<Record> GetRecordEntityByIdAsync(string id);
    Task<Record> GetRecordEntityByLeetCodeNoAndUserSub(int leetCodeNo, string userSub);
    void CreateRecord(string userSub, RecordDto recordDto);
    Task<bool> SaveChangesAsync();
}