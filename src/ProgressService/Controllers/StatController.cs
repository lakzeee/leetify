using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProgressService.Data;
using ProgressService.Dtos;
using ProgressService.Services;
using QuestionService;

namespace ProgressService.Controllers;

[ApiController]
[Route("api/progress/[controller]")]
public class StatController : ControllerBase
{
    private readonly GrpcQuestionClient _grpcClient;
    private readonly IRecordRepository _repository;

    public StatController(GrpcQuestionClient grpcClient, IRecordRepository repository)
    {
        _grpcClient = grpcClient;
        _repository = repository;
    }

    [HttpGet("difficulties")]
    [Authorize]
    public async Task<ActionResult<List<int>>> GetDifficultiesCount()
    {
        var leetCodeNos = await _repository.GetLeetCodeNosByUserSubAndColumn(GetUserSubFromToken(), "c");
        if (string.IsNullOrWhiteSpace(leetCodeNos)) return NotFound("Questions Not Found");
        var difficulties = _grpcClient.GetDifficultiesCount(leetCodeNos);
        if (difficulties.Any()) return Ok(difficulties);
        return BadRequest("Something went wrong while fetching difficulties count");
    }

    [HttpGet("topics")]
    [Authorize]
    public async Task<ActionResult<List<GrpcTopicsModel>>> GetTopicsCount()
    {
        var leetCodeNos = await _repository.GetLeetCodeNosByUserSubAndColumn(GetUserSubFromToken(), "c");
        if (string.IsNullOrWhiteSpace(leetCodeNos)) return NotFound("Questions Not Found");
        var topics = _grpcClient.GetTopicsCount(leetCodeNos);
        if (topics.Any()) return Ok(topics);
        return BadRequest("Something went wrong while fetching topics count");
    }

    [HttpGet("questions")]
    [Authorize]
    public async Task<ActionResult<List<QuestionDto>>> GetQuestions()
    {
        var records = await _repository.GetGetMostRecentUserRecord(GetUserSubFromToken(), 10);
        if (!records.Any()) return NotFound("Questions Not Found");

        var questions = _grpcClient.GetQuestions(
            string.Join(",", records.Select(x => x.LeetCodeNo).ToList()));

        if (!questions.Any()) return BadRequest("Something went wrong while fetching questions");

        var joinedData = from record in records
            join question in questions on record.LeetCodeNo equals question.LeetCodeNo
            select new QuestionDto
            {
                LeetCodeNo = record.LeetCodeNo,
                StatusName = record.StatusName,
                ColumnId = record.ColumnId,
                UpdatedAt = record.UpdatedAt,
                Title = question.Title,
                Topics = question.Topics,
                Difficulty = question.Difficulty
            };
        return Ok(joinedData.OrderByDescending(x => x.UpdatedAt));
    }
    
    private string GetUserSubFromToken()
    {
        var identity = HttpContext.User.Identity as ClaimsIdentity;
        IList<Claim> claim = identity?.Claims.ToList();
        return claim?[2].Value;
    }
}