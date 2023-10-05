using Grpc.Core;
using UserService.Data;

namespace UserService.Service;

public class GrpcUserPublicInfoService : GrpcUserPublicInfo.GrpcUserPublicInfoBase
{
    private readonly IUserRepository _userRepository;

    public GrpcUserPublicInfoService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public override async Task<GrpcUserPublicInfoResponse> GetUserPublicInfo(GetUserPublicInfoRequest request,
        ServerCallContext context)
    {
        var user = await _userRepository.GetUserByUserSub(request.UserSub);
        if (user == null) throw new RpcException(new Status(StatusCode.NotFound, "No User Found"));
        var response = new GrpcUserPublicInfoResponse
        {
            ProfileName = user.ProfileName,
            Image = user.Image
        };
        return response;
    }
}