using UserService.DTOs;
using UserService.Models;

namespace UserService.Data;

public interface IUserRepository
{
    public Task<User> GetUserByEmail(string email);
    public Task<User> GetUserByUserSub(string userSub);
    public Task<bool> UpdateUserProfileName(string id, string newProfileName, string userSub);
    public Task<string> CreateUser(UserDto userDto);
    public Task<long> GetUsersCount();
}