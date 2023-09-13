using QuestionService.DTOs;
using QuestionService.Entities;

namespace QuestionService.Data;

public interface IQuestionRepository
{
    Task<(List<Question>, int totalResultCount, int pageCount)> GetQuestionEntitiesAsync(int pageNumber,
        int pageSize, string orderBy, string filterBy,
        string sortOrder, string difficulty);

    Task<List<QuestionDto>> GetQuestionsByQuestionNumbers(string questionNumbers);

    Task<List<string>> GetAllTopics();
}