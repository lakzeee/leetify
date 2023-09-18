using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PlanService.Data;
using PlanService.DTOs;
using PlanService.Models;

namespace PlanService.Controllers;

[ApiController]
[Route("api/plan")]
public class SavePlanController : ControllerBase
{
    private readonly ISavedPlanRepository _repo;

    public SavePlanController(ISavedPlanRepository repository)
    {
        _repo = repository;
    }

    [HttpPost]
    [Route("save")]
    public async Task<ActionResult> SavePlanToUser([FromBody] SavePlanDto savePlanDto)
    {
        var res = await _repo.SavePlanToUser(savePlanDto.UserId, savePlanDto.PlanId);
        return res ? Ok() : BadRequest();
    }

    [HttpPost]
    [Route("remove")]
    public async Task<ActionResult> RemoveFromUser([FromBody] SavePlanDto savePlanDto)
    {
        var res = await _repo.RemovePlanFromUser(savePlanDto.UserId, savePlanDto.PlanId);
        return res ? Ok() : BadRequest();
    }

    [HttpGet]
    [Route("saved/{userId}")]
    public async Task<SavePlan> GetSavedPlanRecordByUserId(string userId)
    {
        return await _repo.GetSavedPlanRecordByUserId(userId);
    }
}