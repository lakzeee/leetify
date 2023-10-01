using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

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

// cors policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("customPolicy",
        b =>
        {
            b
                .WithOrigins("https://leetify.live", "http://localhost:3000")
                .AllowAnyHeader()
                .AllowCredentials()
                .AllowAnyMethod();
        });
});

var app = builder.Build();

app.UseCors("customPolicy");
app.MapReverseProxy();
app.UseAuthentication();
app.UseAuthorization();
app.Run();