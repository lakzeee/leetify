using MongoDB.Entities;
using Newtonsoft.Json;

namespace SearchService.Models;

public class Question : Entity
{
    [JsonProperty("questionId")] public int LeetCodeNo { get; set; }
    [JsonProperty("questionTitle")] public string Title { get; set; }
    [JsonProperty("questionText")] public string Description { get; set; }
    public string Topics { get; set; }
    public string Difficulty { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}