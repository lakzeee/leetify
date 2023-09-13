using Microsoft.AspNetCore.Mvc;
using QuestionService.Data;
using QuestionService.DTOs;
using QuestionService.Entities;
using QuestionService.RequestHelpers;
using Serilog;

namespace QuestionService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class QuestionController : ControllerBase
{
    private readonly IQuestionRepository _repo;

    public QuestionController(IQuestionRepository questionRepository)
    {
        _repo = questionRepository;
    }

    /// <summary>
    /// Return a list of question based on the query params
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    public async Task<ActionResult<List<Question>>> GetQuestions([FromQuery] SearchParams searchParams)
    {
        var (questions, totalCount, pageCount) = await _repo.GetQuestionEntitiesAsync(
            searchParams.PageNumber,
            searchParams.PageSize,
            searchParams.OrderBy,
            searchParams.FilterBy,
            searchParams.SortOrder,
            searchParams.Difficulty
        );
        return Ok(new
        {
            results = questions,
            totalCount = totalCount,
            pageCount = pageCount
        });
    }

    [HttpGet]
    [Route("byqn")]
    public async Task<ActionResult<List<QuestionDto>>> GetQuestionsByQuestionNumbers([FromQuery] string questionNumbers)
    {
        Log.Information("===> getting questions by qn");
        return Ok(await _repo.GetQuestionsByQuestionNumbers(questionNumbers));
    }

    [HttpGet]
    [Route("topicList")]
    public async Task<ActionResult<List<string>>> GetTopicList()
    {
        Log.Information("===> getting topic list");
        return Ok(await _repo.GetAllTopics());
    }
}