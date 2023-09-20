using Microsoft.EntityFrameworkCore;

namespace ProgressService.Data;

public class DbInitializer
{
    public static void InitDb(WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        scope.ServiceProvider.GetService<ProgressDbContext>().Database.Migrate();
    }
}