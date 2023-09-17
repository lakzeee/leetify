using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using MongoDB.Entities;
using PlanService.Models;
using Serilog;

namespace PlanService.Data;

public class DbInitializer
{
    public static async Task InitDb(WebApplication app)
    {
        Log.Information("Initialing Connection to PlanDB");
        await DB.InitAsync("PlanDB", MongoClientSettings
            .FromConnectionString(app.Configuration.GetConnectionString("MongoDbConnection")));
        await DB.Index<Plan>()
            .Key(x => x.PlanName, KeyType.Text)
            .Key(x => x.Description, KeyType.Text)
            .Key(x => x.Tags, KeyType.Text)
            .CreateAsync();
        Log.Information("Connection to PlanDB Success");
    }
}