using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Entities;
using PlanService.Models;

namespace PlanService.Data.Impl;

public class SavePlanRepository : ISavedPlanRepository
{
    public async Task<bool> SavePlanToUser(string userId, string planId)
    {
        var userRecord = await DB.Find<SavePlan>()
            .ManyAsync(x => x.UserId == userId);
        switch (userRecord.Count)
        {
            case 0:
            {
                var newRecord = new SavePlan()
                {
                    UserId = userId,
                    PlanIds = new List<string>() { planId }
                };
                await newRecord.SaveAsync();
                return true;
            }
            case 1:
            {
                var existRecord = userRecord[0];
                if (existRecord.PlanIds.Contains(planId)) return false;
                existRecord.PlanIds.Add(planId);
                await existRecord.SaveAsync();
                return true;
            }
            default:
                return false;
        }
    }

    public async Task<bool> RemovePlanFromUser(string userId, string planId)
    {
        var userRecord = await DB.Find<SavePlan>()
            .ManyAsync(x => x.UserId == userId);
        if (userRecord.Count != 1) return false;
        var existRecord = userRecord[0];
        if (!existRecord.PlanIds.Contains(planId)) return false;
        existRecord.PlanIds.Remove(planId);
        await existRecord.SaveAsync();
        return true;
    }

    public async Task<SavePlan> GetSavedPlanRecordByUserId(string userId)
    {
        var userRecord = await DB.Find<SavePlan>()
            .ManyAsync(x => x.UserId == userId);
        var record = userRecord[0];
        return userRecord.Count == 1 ? record : null;
    }
}