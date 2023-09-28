using AutoMapper;
using ProgressService.Dtos;
using ProgressService.Entities;

namespace ProgressService.RequestHelper;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<RecordDto, Record>();
        CreateMap<Record, RecordDto>();
        CreateMap<DayCount, DayCountDto>();
    }
}