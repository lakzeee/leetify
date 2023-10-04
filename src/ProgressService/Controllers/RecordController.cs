using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProgressService.Data;
using ProgressService.Dtos;

namespace ProgressService.Controllers;

[ApiController]
[Route("api/progress/[controller]")]
public class RecordController : ControllerBase
{
    private readonly IRecordRepository _recordRepo;
    private readonly IDayCountRepository _dayCountRepo;

    public RecordController(IRecordRepository recordRepository, IDayCountRepository dayCountRepository)
    {
        _recordRepo = recordRepository;
        _dayCountRepo = dayCountRepository;
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<RecordDto>> GetRecordList([FromQuery] string questionNumbers)
    {
        var numbers = questionNumbers.Split(',').Select(q => int.Parse(q.Trim())).ToList();
        var recordDtos = await _recordRepo.GetRecordListByLeetCodeNoAsync(GetUserSubFromToken(), numbers);
        if (recordDtos == null) return NotFound();
        if (recordDtos.Count > 0) return Ok(recordDtos);
        return NotFound();
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult> CreateRecord([FromBody] RecordDto recordDto)
    {
        var userId = GetUserSubFromToken();
        if (userId == null) return Forbid();
        
        var existRecord =
            await _recordRepo.GetRecordEntityByLeetCodeNoAndUserSub(recordDto.LeetCodeNo, GetUserSubFromToken());
        
        if (existRecord != null)
        {
            await _dayCountRepo.AddDayCount(userId);
            existRecord.ColumnId = recordDto.ColumnId;
            existRecord.StatusName = recordDto.StatusName;
            existRecord.Tags = recordDto.Tags;
            existRecord.UpdatedAt = DateTime.UtcNow;
            var updateResult = await _recordRepo.SaveChangesAsync();
            if (updateResult) return Ok();
            return BadRequest("Something went wrong while updating record");
        }
        else
        {
            await _dayCountRepo.AddDayCount(userId);
            _recordRepo.CreateRecord(userId, recordDto);
            var result = await _recordRepo.SaveChangesAsync();
            if (result) return Ok();
            return BadRequest("Something went wrong while creating record");
        }

    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateRecord(string id, [FromBody] UpdateRecordDto updateRecord)
    {
        var record = await _recordRepo.GetRecordEntityByIdAsync(id);
        record.ColumnId = updateRecord.ColumnId ?? record.ColumnId;
        record.StatusName = updateRecord.StatusName ?? record.StatusName;
        record.Tags = updateRecord.Tags ?? record.Tags;
        record.UpdatedAt = DateTime.UtcNow;
        await _dayCountRepo.AddDayCount(GetUserSubFromToken());
        var result = await _recordRepo.SaveChangesAsync();
        if (result)
            return Ok();
        else
            return BadRequest("Something went wrong while updating record");
    }

    private string GetUserSubFromToken()
    {
        var identity = HttpContext.User.Identity as ClaimsIdentity;
        IList<Claim> claim = identity?.Claims.ToList();
        return claim?[3].Value;
    }
}