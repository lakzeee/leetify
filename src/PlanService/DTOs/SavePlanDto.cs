using System.Collections.Generic;

namespace PlanService.DTOs;

public class SavePlanDto
{
    public string UserSub { get; set; }
    public List<string> PlanIds { get; set; }
}