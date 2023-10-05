using System;
using Grpc.Net.Client;
using Microsoft.Extensions.Configuration;
using PlanService.DTOs;
using Serilog;
using UserService;

namespace PlanService.Services;

public class GrpcUserClient
{
    private readonly IConfiguration _configuration;
    private readonly GrpcChannel _channel;

    public GrpcUserClient(IConfiguration configuration)
    {
        _configuration = configuration;
        _channel = GrpcChannel.ForAddress(_configuration["GrpcUser"]);
    }

    public PublicUserInfoDto GetPublicUserInfoDto(string userSub)
    {
        var client = new GrpcUserPublicInfo.GrpcUserPublicInfoClient(_channel);
        var request = new GetUserPublicInfoRequest { UserSub = userSub };
        try
        {
            var reply = client.GetUserPublicInfo(request);
            var publicUserInfoDto = new PublicUserInfoDto
            {
                Image = reply.Image,
                ProfileName = reply.ProfileName
            };
            return publicUserInfoDto;
        }
        catch (Exception e)
        {
            Log.Error(e, "Can't GetDifficultiesCount");
            return null;
        }
    }
}