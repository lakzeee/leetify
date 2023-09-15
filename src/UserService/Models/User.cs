using MongoDB.Entities;

namespace UserService.Models;

public class User : Entity
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string AuthProvider { get; set; }
    public bool IsConsent { get; set; } = false;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}