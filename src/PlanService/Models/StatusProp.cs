using System.Collections.Generic;
using MongoDB.Entities;

namespace PlanService.Models;

public class StatusProp : Entity
{
    public string UserSub { get; set; }
    public List<StatusItem> StatusItems { get; set; }
}

public class StatusItem
{
    public string Id { get; set; }
    public string ColumnId { get; set; }
    public string Content { get; set; }
}