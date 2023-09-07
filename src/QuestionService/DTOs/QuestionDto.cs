namespace QuestionService.DTOs;

public class QuestionDto
{
    public Guid Id { get; set; }
    public int LeetCodeNo { get; set; }
    public string Title { get; set; }
    public string Topics { get; set; }
    public string Difficulty { get; set; }
}