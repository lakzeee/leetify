using System.Collections.Generic;

namespace PlanService.DTOs;

public class ProgressPlanDto
{
    public string PlanName { get; set; }
    public string Tags { get; set; }
    public string Description { get; set; }
    public List<ProgressPlanQuestion> QuestionList { get; set; }
}

public class ProgressPlanQuestion
{
    public string Id { get; set; }
    public int LeetCodeNo { get; set; }
    public string Topics { get; set; }
    public string Title { get; set; }
    public string Difficulty { get; set; }
    public string GroupName { get; set; }
    public int GroupOrder { get; set; }
    public int GroupRank { get; set; }
    public string StatusName { get; set; }
    public string ColumnId { get; set; }
    public string Tags { get; set; }
    public string UpdatedAt { get; set; }
}