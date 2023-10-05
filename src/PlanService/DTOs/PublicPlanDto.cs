using System;
using System.Collections.Generic;

namespace PlanService.DTOs;

public class PublicPlanDto
{
    public string PlanName { get; set; }
    public string ProfileName { get; set; }
    public string Image { get; set; }
    public string Tags { get; set; }
    public string Description { get; set; }
    public bool IsPublic { get; set; }
    public string UserSub { get; set; }
    public List<PublicPlanQuestion> QuestionList { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

public class PublicPlanQuestion
{
    public string Id { get; set; }
    public int LeetCodeNo { get; set; }
    public string Topics { get; set; }
    public string Title { get; set; }
    public string Difficulty { get; set; }
    public string GroupName { get; set; }
    public int GroupOrder { get; set; }
    public int GroupRank { get; set; }
}