using AutoMapper;
using UserService.DTOs;
using UserService.Models;

namespace UserService.RequestHelper;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<UserDto, User>();
    }
}