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
            .ForMember(dest => dest.UserSub, opt => opt.MapFrom(src => src.UserSub))
            .ForMember(dest => dest.QuestionList, opt => opt.MapFrom(src => src.QuestionList));
        CreateMap<PlanQuestionDto, PlanQuestion>();
        CreateMap<Plan, PlanDto>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.ID));
        CreateMap<StatusItemDto, StatusItem>();
        CreateMap<Plan, PublicPlanDto>()
            .ForMember(dest => dest.QuestionList, opt => opt.MapFrom(src => src.QuestionList));
        CreateMap<PlanQuestion, PublicPlanQuestion>();
        CreateMap<Plan, ProgressPlanDto>()
            .ForMember(dest => dest.QuestionList, opt => opt.MapFrom(src => src.QuestionList));
        CreateMap<PlanQuestion, ProgressPlanQuestion>();
    }
}