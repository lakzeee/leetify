using Grpc.Core;
using QuestionService.Data;

namespace QuestionService.Services;

public class GrpcTopicsService : GrpcTopics.GrpcTopicsBase
{
    private readonly IQuestionRepository _repository;

    public GrpcTopicsService(IQuestionRepository questionRepository)
    {
        _repository = questionRepository;
    }

    public override async Task<GrpcTopicsResponse> GetTopics(GetTopicsRequest request, ServerCallContext context)
    {
        var questions = await _repository.GetQuestionsByQuestionNumbers(request.Ids);
        if (questions == null || questions.Count == 0)
            throw new RpcException(new Status(StatusCode.NotFound, "No Question were found"));
        var topicCounts = questions
            .SelectMany(q => q.Topics.Split(new[] { "," }, StringSplitOptions.RemoveEmptyEntries))
            .GroupBy(topic => topic)
            .Select(group => new GrpcTopicsModel
            {
                X = group.Key,
                Y = group.Count()
            })
            .ToList();
        var response = new GrpcTopicsResponse();
        response.Topics.AddRange(topicCounts);
        return response;
    }
}