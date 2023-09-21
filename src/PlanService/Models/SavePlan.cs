using System.Collections.Generic;
using MongoDB.Entities;

namespace PlanService.Models;

public class SavePlan : Entity
{
    public string UserSub { get; set; }
    public List<string> PlanIds { get; set; }
}