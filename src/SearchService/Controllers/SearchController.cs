using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Entities;
using SearchService.DTOs;
using SearchService.Models;

namespace SearchService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SearchController : ControllerBase
{
    private readonly IMapper _mapper;

    public SearchController(IMapper mapper)
    {
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<List<Question>>> SearchQuestion([FromQuery] string keyword)
    {
        try
        {
            var questions = await DB.Find<Question>()
                .Match(Search.Full, keyword)
                .SortByTextScore()
                .Limit(5)
                .ExecuteAsync();
            return Ok(_mapper.Map<List<Question>, List<QuestionDto>>(questions));
        }
        catch (Exception e)
        {
            return BadRequest($"Something went wrong while searching for {keyword}");
        }
    }
}