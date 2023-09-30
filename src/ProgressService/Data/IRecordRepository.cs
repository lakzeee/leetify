using ProgressService.Dtos;
using ProgressService.Entities;

namespace ProgressService.Data;

public interface IRecordRepository
{
    Task<List<RecordDto>> GetRecordListByLeetCodeNoAsync(string userSub, List<int> nos);
    Task<string> GetLeetCodeNosByUserSubAndColumn(string userSub, string columnId);
    Task<List<Record>> GetGetMostRecentUserRecord(string userSub, int number);
    Task<Record> GetRecordEntityByIdAsync(string id);
    Task<Record> GetRecordEntityByLeetCodeNoAndUserSub(int leetCodeNo, string userSub);
    void CreateRecord(string userSub, RecordDto recordDto);
    Task<bool> SaveChangesAsync();
}