using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PlanService.Data;
using PlanService.DTOs;
using PlanService.Models;
using Serilog;

namespace PlanService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PlanController : ControllerBase
{
    private readonly IPlanRepository _repo;

    public PlanController(IPlanRepository repository)
    {
        _repo = repository;
    }

    private bool VerifyUserEmail(string email)
    {
        var identity = HttpContext.User.Identity as ClaimsIdentity;
        IList<Claim> claim = identity?.Claims.ToList();
        return email == claim?[1].Value;
    }

    [HttpPost]
    public async Task<ActionResult> CreateNewPlan([FromBody] CreatePlanDto createPlanDto)
    {
        var res = await _repo.SavePlanAsync(createPlanDto);
        if (!res) return BadRequest("Something went wrong");
        return Ok();
    }

    [HttpGet("{userId}")]
    [Authorize]
    public async Task<ActionResult<List<Plan>>> GetUserCreatedPlan(string userId)
    {
        try
        {
            return Ok(await _repo.GetUserCreatedPlan(userId));
        }
        catch (Exception e)
        {
            Log.Error("GetUserCreatedPlan Error: ", e.Message);
            return StatusCode(500, "Internal Server Error");
        }
    }

    [HttpGet]
    [Route("public")]
    public async Task<ActionResult<List<Plan>>> GetAllPublicPlan()
    {
        return Ok(await _repo.GetAllPublicPlan());
    }
}