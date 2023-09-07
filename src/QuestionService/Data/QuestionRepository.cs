using System.Linq.Expressions;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QuestionService.DTOs;
using QuestionService.Entities;

namespace QuestionService.Data;

public class QuestionRepository : IQuestionRepository
{
    private readonly QuestionDbContext _context;
    private readonly IMapper _mapper;
    private IQuestionRepository _questionRepositoryImplementation;

    public QuestionRepository(QuestionDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }


    public async Task<List<Question>> GetQuestionEntitiesAsync(int pageNumber, int pageSize, string orderBy,
        string filterBy,
        string sortOrder,
        string difficulty)
    {
        IQueryable<Question> query = _context.Questions;

        // filter for topic
        if (!string.IsNullOrWhiteSpace(filterBy))
            query = query.Where(q => q.Topics.Contains(filterBy));

        if (!string.IsNullOrWhiteSpace(difficulty))
        {
            var difficultyLevels = difficulty.Split(',').ToList();
            query = query.Where(q => difficultyLevels.Contains(q.Difficulty.ToLower()));
        }

        switch (orderBy)
        {
            case "createdAt":
                query = ApplyOrdering(query, q => q.CreatedAt, sortOrder);
                break;
            case "updatedAt":
                query = ApplyOrdering(query, q => q.UpdatedAt, sortOrder);
                break;
            default:
                // Default ordering by LeetCodeNo, with ascending order as the default
                query = sortOrder == "desc"
                    ? query.OrderByDescending(q => q.LeetCodeNo)
                    : query.OrderBy(q => q.LeetCodeNo);
                break;
        }

        // Calculate the number of items to skip based on pageNumber and pageSize
        var itemsToSkip = (pageNumber - 1) * pageSize;

        // Apply pagination
        query = query.Skip(itemsToSkip).Take(pageSize);

        // Execute the query and return the result as a list
        var questions = await query.ToListAsync();

        return questions;
    }

    public async Task<List<QuestionDto>> GetQuestionsByQuestionNumbers(string questionNumbers)
    {
        var numbers = questionNumbers.Split(',').Select(q => int.Parse(q.Trim()));
        var filteredQuestions = await _context.Questions.Where(q => numbers.Contains(q.LeetCodeNo)).ToListAsync();
        return _mapper.Map<List<QuestionDto>>(filteredQuestions);
    }


    private IQueryable<Question> ApplyOrdering<T>(
        IQueryable<Question> query,
        Expression<Func<Question, T>> keySelector,
        string sortOrder)
    {
        if (sortOrder == "desc")
            return query.OrderByDescending(keySelector);
        else
            return query.OrderBy(keySelector);
    }
}