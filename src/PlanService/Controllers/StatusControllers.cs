using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PlanService.Data;
using PlanService.DTOs;
using PlanService.Models;

namespace PlanService.Controllers;

[ApiController]
[Route("api/plan/status")]
public class StatusControllers : ControllerBase
{
    private readonly IStatusPropRepository _repo;

    public StatusControllers(IStatusPropRepository repository)
    {
        _repo = repository;
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<List<StatusItem>>> GetStatusItemsByUserSub()
    {
        var statusProp = await _repo.GetStatusPropByUserSub(GetUserSubFromToken());
        if (statusProp == null || statusProp.StatusItems.Count == 0) return NotFound("No status items found");
        var statusItems = statusProp.StatusItems;
        return Ok(statusItems);
    }

    [HttpPut]
    [Authorize]
    public async Task<ActionResult<bool>> UpdateUserStatusProp([FromBody] List<StatusItemDto> itemDtos)
    {
        var res = await _repo.UpdateStatusProps(GetUserSubFromToken(), itemDtos);
        if (res) return Ok();
        return BadRequest("Internal Server Error");
    }

    private string GetUserSubFromToken()
    {
        var identity = HttpContext.User.Identity as ClaimsIdentity;
        IList<Claim> claim = identity?.Claims.ToList();
        return claim?[2].Value;
    }
}