namespace ProgressService.Dtos;

public class QuestionDto
{
    public int LeetCodeNo { get; set; }
    public string StatusName { get; set; }
    public string ColumnId { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string Title { get; set; }
    public string Topics { get; set; }
    public string Difficulty { get; set; }
}