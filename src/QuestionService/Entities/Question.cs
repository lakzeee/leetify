using Newtonsoft.Json;

namespace QuestionService.Entities;

public class Question
{
    public Guid Id { get; set; }
    [JsonProperty("questionId")] public int LeetCodeNo { get; set; }
    [JsonProperty("questionTitle")] public string Title { get; set; }
    [JsonProperty("questionSlug")] public string Slug { get; set; }
    [JsonProperty("questionText")] public string Description { get; set; }
    public string Topics { get; set; }
    public string Difficulty { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}