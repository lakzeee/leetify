using System.Collections.Generic;
using PlanService.Models;

namespace PlanService.DTOs;

public class CreatePlanDto
{
    public string PlanName { get; set; }
    public string Tags { get; set; }
    public string Description { get; set; }
    public bool IsPublic { get; set; }
    public string UserSub { get; set; }
    public List<PlanQuestionDto> QuestionList { get; set; }
}

public class PlanQuestionDto
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