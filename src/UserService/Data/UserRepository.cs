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

    public async Task<string> CreateUser(UserDto userDto)
    {
        var newUser = _mapper.Map<User>(userDto);
        await newUser.SaveAsync();
        if (newUser.ID != null) return newUser.ID.ToString();
        return null;
    }
}