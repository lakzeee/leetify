namespace UserService.DTOs;

public class UserDto
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string AuthProvider { get; set; }
    public bool IsConsent { get; set; }
}