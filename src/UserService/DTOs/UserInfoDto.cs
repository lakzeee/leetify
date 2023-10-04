namespace UserService.DTOs;

public class UserInfoDto
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string ProfileName { get; set; }
    public string Email { get; set; }
    public string AuthProvider { get; set; }
    public DateTime CreatedAt { get; set; }
}