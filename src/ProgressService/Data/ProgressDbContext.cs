using Microsoft.EntityFrameworkCore;
using ProgressService.Entities;

namespace ProgressService.Data;

public class ProgressDbContext : DbContext
{
    public ProgressDbContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Record> Record { get; set; }
    public DbSet<DayCount> DayCounts { get; set; }

}