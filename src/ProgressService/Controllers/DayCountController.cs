using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProgressService.Data;
using ProgressService.Dtos;

namespace ProgressService.Controllers;

[ApiController]
[Route("api/progress/stat/[controller]")]
public class DayCountController : ControllerBase
{
    private readonly IDayCountRepository _dayCountRepo;

    public DayCountController(IDayCountRepository dayCountRepository)
    {
        _dayCountRepo = dayCountRepository;
    }

    [Authorize]
    [HttpGet]
    public async Task<List<DayCountDto>> GetDayCountList()
    {
        var dayCountDtos = await _dayCountRepo.GetDayCountsByUserSub(GetUserSubFromToken()) ?? new List<DayCountDto>();
        if (dayCountDtos.Count == 0)
        {
            dayCountDtos.AddRange(new List<DayCountDto>
            {
                {
                    new()
                    {
                        Count = 0,
                        CreatedAt = DateTime.UtcNow.Date.AddDays(-30)
                    }
                },
                {
                    new()
                    {
                        Count = 0,
                        CreatedAt = DateTime.UtcNow.Date
                    }
                }
            });
        }
        else
        {
            var maxDate = dayCountDtos.Max(dto => dto.CreatedAt);
            var minDate = dayCountDtos.Min(dto => dto.CreatedAt);
            var dateGap = maxDate - minDate;

            if (dateGap < TimeSpan.FromDays(30))
                dayCountDtos.Add(new DayCountDto
                {
                    Count = 0,
                    CreatedAt = maxDate.AddDays(-30)
                });
        }

        return dayCountDtos;
    }

    private string GetUserSubFromToken()
    {
        var identity = HttpContext.User.Identity as ClaimsIdentity;
        IList<Claim> claim = identity?.Claims.ToList();
        return claim?[3].Value;
    }
}