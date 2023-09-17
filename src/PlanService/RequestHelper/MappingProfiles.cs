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
            .ForMember(dest => dest.QuestionList, opt => opt.MapFrom(src => src.QuestionList));
        CreateMap<PlanQuestionDto, PlanQuestion>();
        CreateMap<Plan, UserPlanDto>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.ID));
    }
}