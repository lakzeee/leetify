using System.ComponentModel.DataAnnotations;

namespace ProgressService.Entities;

public class Status
{
    [Key] public Guid Id { get; set; }
    public string UserId { get; set; }
    public string GroupName { get; set; } 
    public string StatusName { get; set; }
}