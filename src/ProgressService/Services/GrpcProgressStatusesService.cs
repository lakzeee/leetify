using Grpc.Core;
using ProgressService.Data;
using Serilog;

namespace ProgressService.Services;

public class GrpcProgressStatusesService : GrpcProgressStatuses.GrpcProgressStatusesBase
{
    private readonly IRecordRepository _repository;

    public GrpcProgressStatusesService(IRecordRepository repository)
    {
        _repository = repository;
    }

    public override async Task<GrpcProgressStatusesResponse> GetProgressStatuses(GetProgressStatusesRequest request,
        ServerCallContext context)
    {
        Log.Information($">>>>> Received Grpc call, {request.Ids.ToString()}");
        var ids = request.Ids.ToList();
        if (!ids.Any())
            throw new RpcException(new Status(StatusCode.InvalidArgument, "Need to pass a list of plan id"));
        
        var records = await _repository.GetRecordListByLeetCodeNoAsync(request.UserSub, ids);

        if (!records.Any() || records == null)
            throw new RpcException(new Status(StatusCode.NotFound, "No Record Found"));
            
        var responseModel = records.Select(q => new GrpcProgressStatusModel
        {
            ColumnId = q.ColumnId,
            Id = q.Id.ToString(),
            StatusName = q.StatusName,
            Tags = q.Tags,
            UpdatedAt = q.UpdatedAt.ToString(),
            LeetCodeNo = q.LeetCodeNo
        });
        return new GrpcProgressStatusesResponse
        {
            ProgressStatuses = { responseModel }
        };
    }
}