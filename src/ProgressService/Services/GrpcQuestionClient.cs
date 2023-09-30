using Grpc.Net.Client;
using QuestionService;
using Serilog;

namespace ProgressService.Services;

public class GrpcQuestionClient
{
    private readonly IConfiguration _configuration;
    private readonly GrpcChannel _channel;
    public GrpcQuestionClient(IConfiguration configuration)
    {
        _configuration = configuration;
        _channel = GrpcChannel.ForAddress(_configuration["GrpcQuestion"]);
    }

    public List<int> GetDifficultiesCount(string ids)
    {
        var client = new GrpcDifficulties.GrpcDifficultiesClient(_channel);
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
        var client = new GrpcTopics.GrpcTopicsClient(_channel);
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

    public List<GrpcQuestionsModel> GetQuestions(string ids)
    {
        var client = new GrpcQuestions.GrpcQuestionsClient(_channel);
        var request = new GetQuestionsRequest { Ids = ids };
        try
        {
            var reply = client.GetQuestions(request);
            var questions = new List<GrpcQuestionsModel>();
            questions.AddRange(reply.Questions);
            return questions;
        }
        catch (Exception e)
        {
            Log.Error(e, "Can't GetQuestions");
            return null;
        }
    }
}