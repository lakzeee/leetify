using System.Collections.Generic;
using System.Threading.Tasks;
using PlanService.DTOs;
using PlanService.Models;

namespace PlanService.Data;

public interface IPlanRepository
{
    public Task<string> SavePlanAsync(CreatePlanDto createPlanDto);

    public Task<List<UserPlanDto>> GetUserCreatedPlan(string userId);
    public Task<List<Plan>> GetAllPublicPlan();
    public Task<Plan> GetPlanById(string planId);

    public Task<bool> UpdatePlanById(CreatePlanDto createPlanDto, string planId);
    public Task<bool> DeletePlanById(string planId);
}