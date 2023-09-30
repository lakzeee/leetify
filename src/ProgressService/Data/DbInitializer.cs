using Microsoft.EntityFrameworkCore;

namespace ProgressService.Data;

public class DbInitializer
{
    public static void InitDb(WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        SeedDayCountData(scope.ServiceProvider.GetService<ProgressDbContext>());
    }

    private static void SeedDayCountData(ProgressDbContext context)
    {
        context.Database.Migrate();
    }
    
}