using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using MongoDB.Entities;
using PlanService.DTOs;
using PlanService.Models;
using Serilog;

namespace PlanService.Data.Impl;

public class PlanRepository : IPlanRepository
{
    private readonly IMapper _mapper;

    public PlanRepository(IMapper mapper)
    {
        _mapper = mapper;
    }

    public async Task<string> SavePlanAsync(CreatePlanDto createPlanDto)
    {
        try
        {
            var plan = _mapper.Map<CreatePlanDto, Plan>(createPlanDto);
            plan.CreatedAt = DateTime.UtcNow;
            plan.UpdatedAt = DateTime.UtcNow;
            await plan.SaveAsync();
            return plan.ID.ToString();
        }
        catch (Exception e)
        {
            Log.Error("Saving createPlanDto Fail", e.Message);
            return null;
        }
    }

    public async Task<List<PlanDto>> GetUserCreatedPlans(string userId)
    {
        var plans = await DB.Find<Plan>()
            .ManyAsync(a => a.UserId == userId);
        var userPlans = _mapper.Map<List<Plan>, List<PlanDto>>(plans);
        return userPlans;
    }

    public async Task<List<PlanDto>> GetPlansByPlanIds(List<string> planIds)
    {
        var savedPlans = new List<Plan>();
        foreach (var planId in planIds) savedPlans.Add(await DB.Find<Plan>().OneAsync(planId));
        return _mapper.Map<List<Plan>, List<PlanDto>>(savedPlans);
    }

    public async Task<List<PlanDto>> GetAllPublicPlan()
    {
        var plans = await DB.Find<Plan>().ManyAsync(a => a.IsPublic == true);
        var publicPlan = _mapper.Map<List<Plan>, List<PlanDto>>(plans);
        return publicPlan;
    }
    public async Task<Plan> GetPlanById(string planId)
    {
        return await DB.Find<Plan>().OneAsync(planId);
    }

    public async Task<Plan> GetPublicPlanById(string planId)
    {
        var plan = await DB.Find<Plan>().OneAsync(planId);
        return plan.IsPublic ? plan : null;
    }

    public async Task<bool> UpdatePlanById(CreatePlanDto createPlanDto, string planId)
    {
        var plan = await DB.Find<Plan>().OneAsync(planId);
        if (plan == null) return false;
        plan.PlanName = createPlanDto.PlanName;
        plan.Description = createPlanDto.Description;
        plan.IsPublic = createPlanDto.IsPublic;
        plan.QuestionList = _mapper.Map<List<PlanQuestionDto>, List<PlanQuestion>>(createPlanDto.QuestionList);
        plan.UpdatedAt = DateTime.UtcNow;
        await plan.SaveAsync();
        return true;
    }

    public async Task<bool> DeletePlanById(string planId)
    {
        var plan = await DB.Find<Plan>().OneAsync(planId);
        await plan.DeleteAsync();
        return true;
    }
}