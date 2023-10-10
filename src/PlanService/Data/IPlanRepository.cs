using System.Collections.Generic;
using System.Threading.Tasks;
using PlanService.DTOs;
using PlanService.Models;

namespace PlanService.Data;

public interface IPlanRepository
{
    public Task<string> SavePlanAsync(CreatePlanDto createPlanDto);

    public Task<List<PlanDto>> GetUserCreatedPlans(string userId);
    public Task<List<PlanDto>> GetPlansByPlanIds(List<string> userId);
    public Task<(List<PlanDto>, long, long)> GetAllPublicPlan(int pageNumber, int pageSize, bool orderByNewest, bool orderByMostSaved);
    public Task<Plan> GetPlanById(string planId);
    public Task<Plan> GetPublicPlanById(string planId);
    public Task<bool> UpdatePlanById(CreatePlanDto createPlanDto, string planId);
    public Task<bool> DeletePlanById(string planId);

    public Task<bool> VerifyPlanOwnerShip(string planId, string userSub);
    public Task UpdateSavesCount(string planId, bool isInc);
    public Task<long> GetUserCreatedPlansCount(string userSub);
}