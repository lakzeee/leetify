using System.Linq.Expressions;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using QuestionService.DTOs;
using QuestionService.Entities;

namespace QuestionService.Data;

public class QuestionRepository : IQuestionRepository
{
    private readonly QuestionDbContext _context;
    private readonly IMapper _mapper;
    private readonly IMemoryCache _cache;

    public QuestionRepository(QuestionDbContext context, IMapper mapper, IMemoryCache cache)
    {
        _context = context;
        _mapper = mapper;
        _cache = cache;
    }


    public async Task<(List<Question>, int totalResultCount, int pageCount)> GetQuestionEntitiesAsync(int pageNumber,
        int pageSize, string orderBy,
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

        var totalCount = await query.CountAsync();
        var pageCount = (int)Math.Ceiling((double)totalCount / pageSize);

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

        return (questions, totalCount, pageCount);
    }

    public async Task<List<QuestionDto>> GetQuestionsByQuestionNumbers(string questionNumbers)
    {
        var numbers = questionNumbers.Split(',').Select(q => int.Parse(q.Trim()));
        var filteredQuestions = await _context.Questions.Where(q => numbers.Contains(q.LeetCodeNo)).ToListAsync();
        return _mapper.Map<List<QuestionDto>>(filteredQuestions);
    }

    public async Task<List<string>> GetAllTopics()
    {
        if (_cache.TryGetValue("AllTopics", out List<string> cachedTopics)) return cachedTopics;
        var uniqueTopics = await _context.Questions
            .Select(q => q.Topics) // Select the Topics property
            .ToListAsync(); // Execute the query asynchronously and fetch the data into memory

        var topicList = uniqueTopics
            .SelectMany(topics => topics.Split(',').Select(topic => topic.Trim())) // Split and trim the topics
            .Where(t => !string.IsNullOrEmpty(t))
            .Distinct() // Get distinct topics
            .OrderBy(t => t)
            .ToList();

        _cache.Set("UniqueTopics", topicList, TimeSpan.FromHours(1));

        return topicList;
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