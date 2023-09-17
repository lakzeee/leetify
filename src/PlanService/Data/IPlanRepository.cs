using System.Collections.Generic;
using System.Threading.Tasks;
using PlanService.DTOs;
using PlanService.Models;

namespace PlanService.Data;

public interface IPlanRepository
{
    public Task<bool> SavePlanAsync(CreatePlanDto createPlanDto);

    public Task<List<Plan>> GetUserCreatedPlan(string userId);
    public Task<List<Plan>> GetAllPublicPlan();
}