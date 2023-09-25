using System.ComponentModel.DataAnnotations;

namespace ProgressService.Entities;

public class Record
{
    [Key] public Guid Id { get; set; }
    public string UserSub { get; set; }
    public int LeetCodeNo { get; set; }
    public string StatusName { get; set; }
    public string ColumnId { get; set; }
    public string Tags { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}