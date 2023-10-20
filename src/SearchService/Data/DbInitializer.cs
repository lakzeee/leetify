using MongoDB.Driver;
using MongoDB.Entities;
using Newtonsoft.Json;
using SearchService.Models;
using Serilog;

namespace SearchService.Data;

public class DbInitializer
{
    public static async Task InitDb(WebApplication app)
    {
        await DB.InitAsync("SearchDb", MongoClientSettings
            .FromConnectionString(app.Configuration.GetConnectionString("MongoDbConnection")));

        await DB.Index<Question>()
            .Key(x => x.Title, KeyType.Text)
            .CreateAsync();

        Log.Information("Connection to SearchDb Success");

        if (await DB.CountAsync<Question>() == 0)
        {
            Log.Information("No question in db, need to seed");

            var jsonFilePath = Path.Combine(Directory.GetCurrentDirectory(), @"Data/questions.json");
            if (File.Exists(jsonFilePath))
            {
                var json = File.ReadAllText(jsonFilePath);
                var questions = JsonConvert.DeserializeObject<List<Question>>(json);
                await DB.SaveAsync(questions);
                Log.Information("Finished Seeding Data");
            }
            else
            {
                throw new InvalidOperationException($"JSON file not found at: {jsonFilePath}");
            }
        }
        else
        {
            Log.Information("No Need to seed question data");
        }
    }
}