using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Entities;
using PlanService.DTOs;
using PlanService.Models;
using Serilog;

namespace PlanService.Data.Impl;

public class SavePlanRepository : ISavedPlanRepository
{
    public async Task<bool> SavePlanToUser(string userSub, string planId)
    {
        var savedPlan = new SavePlan
        {
            UserSub = userSub,
            PlanId = planId
        };
        await savedPlan.SaveAsync();
        return true;
    }

    public async Task<bool> RemovePlanFromUser(string userSub, string planId)
    {
        try
        {
            await DB.DeleteAsync<SavePlan>(x => x.UserSub == userSub && x.PlanId == planId);
            return true;
        }
        catch (Exception e)
        {
            Log.Error(e.Message);
            return false;
        }
    }

    public async Task<SavePlanDto> GetSavedPlanRecordByUserSub(string userSub)
    {
        var userRecord = await DB.Find<SavePlan>()
            .ManyAsync(x => x.UserSub == userSub);
        if (!userRecord.Any()) return null;
        var planIds = userRecord.Select(record => record.PlanId).ToList();
        var savePlanDto = new SavePlanDto
        {
            UserSub = userSub,
            PlanIds = planIds
        };
        return savePlanDto;
    }

    public async Task<int> CountSaves(string id)
    {
        var count = await DB.CountAsync<SavePlan>(x => x.PlanId == id);
        return (int)count;
    }
}