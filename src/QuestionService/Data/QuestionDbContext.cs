using Microsoft.EntityFrameworkCore;
using QuestionService.Entities;

namespace QuestionService.Data;

public class QuestionDbContext: DbContext
{
    public QuestionDbContext(DbContextOptions options) : base(options)
    {
    }
    
    public DbSet<Question> Questions { get; set; }
}