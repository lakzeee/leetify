using System;

namespace PlanService.DTOs;

public class PlanDto
{
    public string Id { get; set; }
    public string PlanName { get; set; }
    public string Tags { get; set; }
    public string Description { get; set; }
    public bool IsPublic { get; set; }
    public string UserId { get; set; }
    public int SavesCount { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}