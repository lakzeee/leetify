namespace PlanService.DTOs;

public class ProgressRecordDto
{
    public string Id { get; set; }
    public int LeetCodeNo { get; set; }
    public string StatusName { get; set; }
    public string ColumnId { get; set; }
    public string Tags { get; set; }
    public string UpdatedAt { get; set; }
}