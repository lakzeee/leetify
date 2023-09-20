using Microsoft.EntityFrameworkCore;

namespace ProgressService.Data;

public class ProgressDbContext : DbContext
{
    public ProgressDbContext(DbContextOptions options) : base(options)
    {
    }
}