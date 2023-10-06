using System;
using System.Collections.Generic;
using System.Linq;
using Grpc.Net.Client;
using Microsoft.Extensions.Configuration;
using PlanService.DTOs;
using ProgressService;
using Serilog;

namespace PlanService.Services;

public class GrpcProgressClient
{
    private readonly IConfiguration _configuration;
    private readonly GrpcChannel _channel;

    public GrpcProgressClient(IConfiguration configuration)
    {
        _configuration = configuration;
        _channel = GrpcChannel.ForAddress(_configuration["GrpcProgress"]);
    }

    public List<ProgressRecordDto> GetProgressRecordByLeetCodeNosAndUserSub(string userSub,
        List<int> nos)
    {
        Log.Information("calling grpc progress >>>>>");
        var client = new GrpcProgressStatuses.GrpcProgressStatusesClient(_channel);
        var request = new GetProgressStatusesRequest { Ids = { nos }, UserSub = userSub };
        try
        {
            var reply = client.GetProgressStatuses(request);
            if (!reply.ProgressStatuses.Any()) return null;
            var recordDtos = reply.ProgressStatuses.Select(r => new ProgressRecordDto
            {
                ColumnId = r.ColumnId,
                Id = r.Id,
                StatusName = r.StatusName,
                Tags = r.Tags,
                UpdatedAt = r.UpdatedAt,
                LeetCodeNo = r.LeetCodeNo
            }).ToList();
            return recordDtos;
        }
        catch (Exception e)
        {
            Log.Error(e, "Can't GetProgressRecordByLeetCodeNosAndUserSub");
            return null;
        }
    }
}