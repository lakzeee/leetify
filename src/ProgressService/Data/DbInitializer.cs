using Microsoft.EntityFrameworkCore;
using ProgressService.Entities;

namespace ProgressService.Data;

public class DbInitializer
{
    public static void InitDb(WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var context = scope.ServiceProvider.GetService<ProgressDbContext>();

        SeedDayCountData(context);
    }

    private static void SeedDayCountData(DbContext context)
    {
        context.Database.Migrate();
    }
    
}