using AutoMapper;
using SearchService.DTOs;
using SearchService.Models;

namespace SearchService.RequestHelpers;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Question, QuestionDto>();
        CreateMap<QuestionDto, Question>();
    }
}