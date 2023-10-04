using MongoDB.Entities;

namespace UserService.Models;

public class User : Entity
{
    public string Name { get; set; }
    public string ProfileName { get; set; }
    public string Sub { get; set; }
    public string Email { get; set; }
    public string Image { get; set; }
    public string AuthProvider { get; set; }
    public bool IsConsent { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public bool IsStrictlyCookiesConsent { get; set; }
    public bool IsFunctionalCookiesConsent { get; set; }
}