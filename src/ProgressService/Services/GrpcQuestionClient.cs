using Grpc.Net.Client;
using QuestionService;
using Serilog;

namespace ProgressService.Services;

public class GrpcQuestionClient
{
    private readonly IConfiguration _configuration;

    public GrpcQuestionClient(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public List<int> GetDifficultiesCount(string ids)
    {
        var channel = GrpcChannel.ForAddress(_configuration["GrpcQuestion"]);
        var client = new GrpcDifficulties.GrpcDifficultiesClient(channel);
        var request = new GetDifficultiesRequest { Ids = ids };
        try
        {
            var reply = client.GetDifficulties(request);
            return new List<int>(reply.Difficulties);
        }
        catch (Exception e)
        {
            Log.Error(e, "Can't GetDifficultiesCount");
            return null;
        }
    }

    public List<GrpcTopicsModel> GetTopicsCount(string ids)
    {
        var channel = GrpcChannel.ForAddress(_configuration["GrpcQuestion"]);
        var client = new GrpcTopics.GrpcTopicsClient(channel);
        var request = new GetTopicsRequest { Ids = ids };
        try
        {
            var reply = client.GetTopics(request);
            var topics = new List<GrpcTopicsModel>();
            topics.AddRange(reply.Topics);
            return topics;
        }
        catch (Exception e)
        {
            Log.Error(e, "Can't GetTopicsCount");
            return null;
        }
    }
}