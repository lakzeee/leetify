using MongoDB.Driver;
using MongoDB.Entities;
using Serilog;
using UserService.Models;

namespace UserService.Data;

public class DbInitializer
{
    public static async Task InitDb(WebApplication app)
    {
        Log.Information("Initialing Connection to UserDB");
        await DB.InitAsync("UserDb", MongoClientSettings
            .FromConnectionString(app.Configuration.GetConnectionString("MongoDbConnection")));
        await DB.Index<User>()
            .Key(x => x.Email, KeyType.Text)
            .CreateAsync();
    }
}