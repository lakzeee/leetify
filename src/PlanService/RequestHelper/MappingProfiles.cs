using AutoMapper;
using MongoDB.Bson;
using PlanService.DTOs;
using PlanService.Models;

namespace PlanService.RequestHelper;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<CreatePlanDto, Plan>()
            .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
            .ForMember(dest => dest.PlanQuestion, opt => opt.MapFrom(src => src.QuestionList));
        CreateMap<PlanQuestionDto, PlanQuestion>();
    }
}