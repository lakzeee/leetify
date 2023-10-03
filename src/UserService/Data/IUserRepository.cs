using Microsoft.AspNetCore.Mvc;
using UserService.DTOs;
using UserService.Models;

namespace UserService.Data;

public interface IUserRepository
{
    public Task<User> GetUserByEmail(string email);
    public Task<User> GetUserByUserSub(string userSub);
    public Task<string> CreateUser(UserDto userDto);
}