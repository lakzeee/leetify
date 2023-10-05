using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PlanService.Data;
using PlanService.DTOs;
using PlanService.Models;
using PlanService.Services;
using Serilog;

namespace PlanService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PlanController : ControllerBase
{
    private readonly IPlanRepository _planRepo;
    private readonly ISavedPlanRepository _savedPlanRepository;
    private readonly GrpcUserClient _grpcUserClient;
    private readonly IMapper _mapper;

    public PlanController(IPlanRepository planRepository, ISavedPlanRepository savedPlanRepository,
        GrpcUserClient grpcUserClient, IMapper mapper)
    {
        _planRepo = planRepository;
        _savedPlanRepository = savedPlanRepository;
        _grpcUserClient = grpcUserClient;
        _mapper = mapper;
    }

    // CRUD of a plan
    [HttpPost]
    [Authorize]
    public async Task<ActionResult> CreateNewPlan([FromBody] CreatePlanDto createPlanDto)
    {
        createPlanDto.UserSub = GetUserSubFromToken();
        var res = await _planRepo.SavePlanAsync(createPlanDto);
        if (res == null) return BadRequest("Something went wrong");
        return Ok(new { PlanId = res });
    }

    [Authorize]
    [HttpGet("{planId}")]
    public async Task<ActionResult<List<Plan>>> GetPlanById(string planId)
    {
        var plan = await _planRepo.GetPlanById(planId);
        return plan.UserSub == GetUserSubFromToken() ? Ok(plan) : Unauthorized();
    }


    [Authorize]
    [HttpPut("{planId}")]
    public async Task<ActionResult> UpdatePlanById([FromBody] CreatePlanDto createPlanDto, string planId)
    {
        if (!await _planRepo.VerifyPlanOwnerShip(planId, GetUserSubFromToken())) return Unauthorized();
        var res = await _planRepo.UpdatePlanById(createPlanDto, planId);
        if (!res) return StatusCode(500, "Internal Server Error");
        return Ok();
    }

    [Authorize]
    [HttpDelete("{planId}")]
    public async Task<ActionResult> DeletePlanById(string planId)
    {
        if (!await _planRepo.VerifyPlanOwnerShip(planId, GetUserSubFromToken())) return Unauthorized();
        var res = await _planRepo.DeletePlanById(planId);
        if (!res) return StatusCode(500, "Internal Server Error");
        return Ok();
    }

    // Get User Created Plans
    [HttpGet]
    [Route("user")]
    [Authorize]
    public async Task<ActionResult<List<PlanDto>>> GetUserCreatedPlan()
    {
        try
        {
            return Ok(await _planRepo.GetUserCreatedPlans(GetUserSubFromToken()));
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
        return Ok(await _planRepo.GetAllPublicPlan());
    }

    [HttpGet]
    [Route("public/{planId}")]
    public async Task<ActionResult<Plan>> GetPublicPlanById(string planId)
    {
        try
        {
            var plan = await _planRepo.GetPublicPlanById(planId);
            var savesCount = await _savedPlanRepository.CountSaves(planId);
            if (plan == null) return NotFound();
            var publicPlanDto = _mapper.Map<PublicPlanDto>(plan);
            var publicUserInfoDto = _grpcUserClient.GetPublicUserInfoDto(plan.UserSub);
            if (publicUserInfoDto == null) return NotFound("Couldn't find user information");
            publicPlanDto.Image = publicUserInfoDto.Image;
            publicPlanDto.ProfileName = publicUserInfoDto.ProfileName;
            publicPlanDto.SavesCount = savesCount;
            return Ok(publicPlanDto);
        }
        catch (Exception e)
        {
            Log.Error(e.Message);
            return StatusCode(500, "Interval server error");
        }

    }

    private string GetUserEmailFromToken()
    {
        var identity = HttpContext.User.Identity as ClaimsIdentity;
        IList<Claim> claim = identity?.Claims.ToList();
        return claim?[1].Value;
    }

    private string GetUserSubFromToken()
    {
        var identity = HttpContext.User.Identity as ClaimsIdentity;
        IList<Claim> claim = identity?.Claims.ToList();
        return claim?[3].Value;
    }

    private bool VerifyUserEmail(string email)
    {
        return email == GetUserEmailFromToken();
    }
    

}