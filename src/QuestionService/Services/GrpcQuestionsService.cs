using Grpc.Core;
using QuestionService.Data;

namespace QuestionService.Services;

public class GrpcQuestionsService : GrpcQuestions.GrpcQuestionsBase
{
    private readonly IQuestionRepository _repository;

    public GrpcQuestionsService(IQuestionRepository questionRepository)
    {
        _repository = questionRepository;
    }

    public override async Task<GrpcQuestionsResponse> GetQuestions(GetQuestionsRequest request,
        ServerCallContext context)
    {
        var questions = await _repository.GetQuestionsByQuestionNumbers(request.Ids);
        if (questions == null || questions.Count == 0)
            throw new RpcException(new Status(StatusCode.NotFound, "No Question were found"));
        var questionsModels = questions.Select(q => new GrpcQuestionsModel
        {
            LeetCodeNo = q.LeetCodeNo,
            Difficulty = q.Difficulty,
            Topics = q.Topics,
            Title = q.Title
        }).ToList();
        return new GrpcQuestionsResponse
        {
            Questions = { questionsModels }
        };
    }
}