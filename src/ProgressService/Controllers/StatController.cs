using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProgressService.Data;
using ProgressService.Services;

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
        var leetCodeNos = await _repository.GetLeetCodeNosByUserSub(GetUserSubFromToken(), "c");
        if (leetCodeNos == null) return NotFound("Questions Not Found");
        var difficulties = _grpcClient.GetDifficultiesCount(leetCodeNos);
        if (difficulties.Any()) return Ok(difficulties);
        return BadRequest("Something went wrong while fetching difficulties count");
    }

    [HttpGet("topics")]
    [Authorize]
    public async Task<ActionResult<List<int>>> GetTopicsCount()
    {
        var leetCodeNos = await _repository.GetLeetCodeNosByUserSub(GetUserSubFromToken(), "c");
        if (leetCodeNos == null) return NotFound("Questions Not Found");
        var topics = _grpcClient.GetTopicsCount(leetCodeNos);
        if (topics.Any()) return Ok(topics);
        return BadRequest("Something went wrong while fetching topics count");
    }
    
    private string GetUserSubFromToken()
    {
        var identity = HttpContext.User.Identity as ClaimsIdentity;
        IList<Claim> claim = identity?.Claims.ToList();
        return claim?[2].Value;
    }
}