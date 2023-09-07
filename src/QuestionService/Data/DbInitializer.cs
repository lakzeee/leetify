using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using QuestionService.Entities;
using Serilog;

namespace QuestionService.Data;

public class DbInitializer
{
    public static void InitDb(WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        SeedData(scope.ServiceProvider.GetService<QuestionDbContext>());
    }

    private static void SeedData(QuestionDbContext context)
    {
        context.Database.Migrate();
        if (context.Questions.Any())
        {
            Log.Information("Already have data - no need to seed");
            return;
        }

        var jsonFilePath = Path.Combine("/Users/lak/Downloads/leetify/src/QuestionService/Data/questions.json");

        if (File.Exists(jsonFilePath))
        {
            var json = File.ReadAllText(jsonFilePath);
            var questions = JsonConvert.DeserializeObject<List<Question>>(json);

            context.Questions.AddRange(questions);
            context.SaveChanges();
            Log.Information("Finished Seeding Data");
        }
        else
        {
            throw new InvalidOperationException($"JSON file not found at: {jsonFilePath}");
        }
    }
}