using System.Reflection;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Polly;
using ProgressService.Data;
using ProgressService.Data.Impl;
using ProgressService.Services;
using Prometheus;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Information()
    .WriteTo.Console()
    .CreateLogger();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
    {
        c.SwaggerDoc("v1", new OpenApiInfo() { Title = "Progress Service Api", Version = "v1" });
        var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
        var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
        c.IncludeXmlComments(xmlPath);
    }
);

// Configuration for PostgreSql, Repo DI, AutoMapper and Memory Cache
builder.Services.AddDbContext<ProgressDbContext>(opt =>
{
    opt.UseNpgsql(builder.Configuration.GetConnectionString("ProgressDbConnection"));
});

var jwtSecret = builder.Configuration["Jwt:Key"];
// Add JWT Authentication
builder.Services.AddAuthentication(o =>
    {
        o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        o.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(o =>
    {
        o.RequireHttpsMetadata = false;
        o.TokenValidationParameters = new TokenValidationParameters()
        {
            NameClaimType = "email",
            ValidateIssuer = true,
            ValidateIssuerSigningKey = true,
            // only for testing
            ValidateLifetime = false,
            ValidateAudience = false,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            IssuerSigningKey =
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret))
        };
    });

// builder.Services.AddScoped<IQuestionRepository, QuestionRepository>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddMemoryCache();
builder.Services.AddScoped<IRecordRepository, RecordRepository>();
builder.Services.AddScoped<IDayCountRepository, DayCountRepository>();
builder.Services.AddScoped<GrpcQuestionClient>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Progress Service Api V1"));
}

app.UseHttpsRedirection();
app.UseHttpMetrics();
app.UseAuthorization();
app.MapMetrics();
app.MapControllers();

DbInitializer.InitDb(app);

app.Run();