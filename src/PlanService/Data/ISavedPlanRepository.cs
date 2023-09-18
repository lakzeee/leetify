using System.Collections.Generic;
using System.Threading.Tasks;
using PlanService.Models;

namespace PlanService.Data;

public interface ISavedPlanRepository
{
    public Task<bool> SavePlanToUser(string userId, string planId);
    public Task<bool> RemovePlanFromUser(string userId, string planId);

    public Task<SavePlan> GetSavedPlanRecordByUserId(string userId);
}