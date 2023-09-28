using Grpc.Core;
using QuestionService.Data;

namespace QuestionService.Services;

public class GrpcDifficultiesService : GrpcDifficulties.GrpcDifficultiesBase
{
    private readonly IQuestionRepository _repository;

    public GrpcDifficultiesService(IQuestionRepository repository)
    {
        _repository = repository;
    }

    public override async Task<GrpcDifficultiesResponse> GetDifficulties(GetDifficultiesRequest request,
        ServerCallContext context)
    {
        var questions = await _repository.GetQuestionsByQuestionNumbers(request.Ids);
        if (questions == null || questions.Count == 0)
            throw new RpcException(new Status(StatusCode.NotFound, "No Question were found"));
        var difficulties = new List<int>
        {
            questions.Count(q => q.Difficulty == "Easy"),
            questions.Count(q => q.Difficulty == "Medium"),
            questions.Count(q => q.Difficulty == "Hard")
        };
        var response = new GrpcDifficultiesResponse()
        {
            Difficulties = { difficulties }
        };
        return response;
    }
}