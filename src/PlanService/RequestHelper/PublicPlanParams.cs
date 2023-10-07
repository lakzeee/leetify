namespace PlanService.RequestHelper;

public class PublicPlanParams
{
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 5;
    public bool OrderByNewest { get; set; }
    public bool OrderByMostSaved { get; set; }
}