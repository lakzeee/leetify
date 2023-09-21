using System.Collections.Generic;
using System.Threading.Tasks;
using PlanService.Models;

namespace PlanService.Data;

public interface ISavedPlanRepository
{
    public Task<bool> SavePlanToUser(string userSub, string planId);
    public Task<bool> RemovePlanFromUser(string userSub, string planId);

    public Task<SavePlan> GetSavedPlanRecordByUserSub(string userSub);
}