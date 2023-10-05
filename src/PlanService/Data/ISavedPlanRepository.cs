using System.Collections.Generic;
using System.Threading.Tasks;
using PlanService.DTOs;
using PlanService.Models;

namespace PlanService.Data;

public interface ISavedPlanRepository
{
    public Task<bool> SavePlanToUser(string userSub, string planId);
    public Task<bool> RemovePlanFromUser(string userSub, string planId);

    public Task<SavePlanDto> GetSavedPlanRecordByUserSub(string userSub);

    public Task<int> CountSaves(string id);
}