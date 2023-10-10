using System;
using System.Collections.Generic;
using System.Linq;
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
    private readonly ISavedPlanRepository _savedPlanRepository;

    public PlanRepository(IMapper mapper, ISavedPlanRepository savedPlanRepository)
    {
        _mapper = mapper;
        _savedPlanRepository = savedPlanRepository;
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

    public async Task<List<PlanDto>> GetUserCreatedPlans(string userSub)
    {
        var plans = await DB.Find<Plan>()
            .ManyAsync(a => a.UserSub == userSub);
        var userPlans = _mapper.Map<List<Plan>, List<PlanDto>>(plans);
        return userPlans;
    }

    public async Task<List<PlanDto>> GetPlansByPlanIds(List<string> planIds)
    {
        var savedPlans = new List<Plan>();
        foreach (var planId in planIds)
        {
            var plan = await DB.Find<Plan>().OneAsync(planId);
            if (plan != null) savedPlans.Add(plan);
        }
        return _mapper.Map<List<Plan>, List<PlanDto>>(savedPlans);
    }

    public async Task<(List<PlanDto>, long, long)> GetAllPublicPlan(int pageNumber, int pageSize, bool orderByNewest,
        bool orderByMostSaved)
    {
        var query = DB.PagedSearch<Plan>();

        if (orderByNewest) query.Sort(x => x.Descending(a => a.CreatedAt));
        else if (orderByMostSaved) query.Sort(x => x.Descending(a => a.SavesCount));
        else query.Sort(x => x.Descending(a => a.PlanName));

        query.PageNumber(pageNumber);
        query.PageSize(pageSize);

        var plans = await query.ExecuteAsync();
        var planDtos = _mapper.Map<List<Plan>, List<PlanDto>>(plans.Results.ToList());
        return (planDtos, plans.PageCount, plans.TotalCount);
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
        plan.Tags = createPlanDto.Tags;
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

    public async Task<bool> VerifyPlanOwnerShip(string planId, string userSub)
    {
        var plan = await DB.Find<Plan>().OneAsync(planId);
        if (plan != null) return plan.UserSub == userSub;
        return false;
    }

    public async Task UpdateSavesCount(string planId, bool isInc)
    {
        var plan = await DB.Find<Plan>().OneAsync(planId);
        if (isInc) plan.SavesCount += 1;
        else plan.SavesCount -= 1;
        await plan.SaveAsync();
    }

    public async Task<long> GetUserCreatedPlansCount(string userSub)
    {
        return await DB.CountAsync<Plan>(x => x.UserSub == userSub);
    }
}