using AutoMapper;
using QuestionService.DTOs;
using QuestionService.Entities;

namespace QuestionService.RequestHelpers;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Question, QuestionDto>();
    }
}