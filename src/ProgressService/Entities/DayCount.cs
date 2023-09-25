using System.ComponentModel.DataAnnotations;

namespace ProgressService.Entities;

public class DayCount
{
    [Key] public Guid Id { get; set; }
    public string UserSub { get; set; }
    public DateTime CreatedAt { get; set; }
    public int Count { get; set; }
}