using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using MongoDB.Entities;
using PlanService.DTOs;
using PlanService.Models;

namespace PlanService.Data.Impl;

public class StatusPropRepository : IStatusPropRepository
{
    private readonly IMapper _mapper;

    public StatusPropRepository(IMapper mapper)
    {
        _mapper = mapper;
    }

    public async Task<bool> UpdateStatusProps(string userSub, List<StatusItemDto> statusItemDtos)
    {
        var statusProps = await DB.Find<StatusProp>()
            .ManyAsync(x => x.UserSub == userSub);
        var newStatusItems = _mapper.Map<List<StatusItem>>(statusItemDtos);
        switch (statusProps.Count)
        {
            case 0:
            {
                var newStatusProp = new StatusProp
                {
                    UserSub = userSub,
                    StatusItems = newStatusItems
                };
                await newStatusProp.SaveAsync();
                return true;
            }
            default:
                statusProps[0].StatusItems = newStatusItems;
                await statusProps.SaveAsync();
                return true;
        }
    }

    public async Task<StatusProp> GetStatusPropByUserSub(string userSub)
    {
        try
        {
            var statusProps = await DB.Find<StatusProp>()
                .ManyAsync(x => x.UserSub == userSub);
            return statusProps.Count > 0 ? statusProps[0] : null;
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            return null;
        }
    }
}