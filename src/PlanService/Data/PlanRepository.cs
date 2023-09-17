using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using MongoDB.Bson;
using MongoDB.Entities;
using PlanService.DTOs;
using PlanService.Models;
using Serilog;

namespace PlanService.Data;

public class PlanRepository : IPlanRepository
{
    private readonly IMapper _mapper;

    public PlanRepository(IMapper mapper)
    {
        _mapper = mapper;
    }

    public async Task<bool> SavePlanAsync(CreatePlanDto createPlanDto)
    {
        try
        {
            var plan = _mapper.Map<CreatePlanDto, Plan>(createPlanDto);
            await plan.SaveAsync();
            return true;
        }
        catch (Exception e)
        {
            Log.Error("Saving createPlanDto Fail", e.Message);
            return false;
        }
    }

    public async Task<List<Plan>> GetUserCreatedPlan(string userId)
    {
        var plans = await DB.Find<Plan>().ManyAsync(a => a.UserId == userId);
        return plans;
    }

    public async Task<List<Plan>> GetAllPublicPlan()
    {
        var plans = await DB.Find<Plan>().ManyAsync(a => a.IsPublic == true);
        return plans;
    }
}