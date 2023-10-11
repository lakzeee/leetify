using AutoMapper;
using MongoDB.Entities;
using UserService.DTOs;
using UserService.Models;

namespace UserService.Data;

public class UserRepository : IUserRepository
{
    private readonly IMapper _mapper;

    public UserRepository(IMapper mapper)
    {
        _mapper = mapper;
    }

    public async Task<User> GetUserByEmail(string email)
    {
        return await DB.Find<User>()
            .Match(u => u.Email == email)
            .ExecuteFirstAsync();
    }

    public async Task<User> GetUserByUserSub(string userSub)
    {
        return await DB.Find<User>()
            .Match(u => u.Sub == userSub)
            .ExecuteFirstAsync();
    }

    public async Task<bool> UpdateUserProfileName(string id, string newProfileName, string userSub)
    {
        var user = await DB.Find<User>().OneAsync(id);
        if (user == null) return false;
        if (user.Sub != userSub) return false;
        user.ProfileName = newProfileName;
        await user.SaveAsync();
        return true;
    }

    public async Task<string> CreateUser(UserDto userDto)
    {
        var newUser = _mapper.Map<User>(userDto);
        newUser.CreatedAt = DateTime.UtcNow;
        newUser.UpdatedAt = DateTime.UtcNow;
        await newUser.SaveAsync();
        if (newUser.ID != null) return newUser.ID.ToString();
        return null;
    }

    public async Task<long> GetUsersCount()
    {
        return await DB.CountAsync<User>();
    }
}