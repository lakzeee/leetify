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
[Route("api/plan/saved")]
public class SavePlanController : ControllerBase
{
    private readonly IPlanRepository _planRepo;
    private readonly ISavedPlanRepository _savedPlanRepo;

    public SavePlanController(IPlanRepository planRepository, ISavedPlanRepository savedPlanRepository)
    {
        _planRepo = planRepository;
        _savedPlanRepo = savedPlanRepository;
    }

    [Authorize]
    [HttpPut("{planId}")]
    public async Task<ActionResult> SavePlanToUser(string planId)
    {
        var res = await _savedPlanRepo.SavePlanToUser(GetUserSubFromToken(), planId);
        return res ? Ok() : BadRequest();
    }

    [Authorize]
    [HttpDelete("{planId}")]
    public async Task<ActionResult> RemoveFromUser(string planId)
    {
        var res = await _savedPlanRepo.RemovePlanFromUser(GetUserSubFromToken(), planId);
        return res ? Ok() : BadRequest();
    }

    [HttpGet]
    [Route("list")]
    [Authorize]
    public async Task<SavePlan> GetSavedPlanIdListByUserSub()
    {
        return await _savedPlanRepo.GetSavedPlanRecordByUserSub(GetUserSubFromToken());
    }
    
    [HttpGet]
    [Route("full")]
    [Authorize]
    public async Task<ActionResult<List<PlanDto>>> GetPublicPlansByUserSub()
    {
        var savedPlanRecord = await _savedPlanRepo.GetSavedPlanRecordByUserSub(GetUserSubFromToken());
        return await _planRepo.GetPlansByPlanIds(savedPlanRecord.PlanIds);
    }


    private string GetUserSubFromToken()
    {
        var identity = HttpContext.User.Identity as ClaimsIdentity;
        IList<Claim> claim = identity?.Claims.ToList();
        return claim?[2].Value;
    }

}