using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Entities;

namespace PlanService.Models;

public class Plan : Entity
{
    public string PlanName { get; set; }
    public string Tags { get; set; }
    public string Description { get; set; }
    public bool IsPublic { get; set; }
    public string UserId { get; set; }
    public List<PlanQuestion> PlanQuestion { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

public class PlanQuestion
{
    public string Id { get; set; }
    public int LeetCodeNo { get; set; }
    public string Title { get; set; }
    public string Difficulty { get; set; }
    public string GroupName { get; set; }
    public int GroupOrder { get; set; }
    public int GroupRank { get; set; }
}