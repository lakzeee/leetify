using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using UserService.Data;
using UserService.DTOs;
using UserService.Models;

namespace UserService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserRepository _repo;
    private readonly IConfiguration _configuration;

    public UserController(IUserRepository userRepository, IConfiguration configuration)
    {
        _repo = userRepository;
        _configuration = configuration;
    }

    private string GetUserEmailFromToken()
    {
        var identity = HttpContext.User.Identity as ClaimsIdentity;
        IList<Claim> claim = identity?.Claims.ToList();
        return claim?[1].Value;
    }

    private bool VerifyUserEmail(string email)
    {
        return email == GetUserEmailFromToken();
    }

    private string CreateUserJwt(string name, string email, string userId)
    {
        var jwtSecret = _configuration["Jwt:Key"];
        var issuer = _configuration["Jwt:Issuer"];
        var claims = new[]
        {
            new Claim("name", name),
            new Claim("userId", userId),
            new Claim("email", email)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret));
        var token = new JwtSecurityToken(
            issuer,
            claims: claims,
            expires: DateTime.UtcNow.AddHours(24),
            signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
        );
        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<User>> GetUserByEmail()
    {
        try
        {
            var email = GetUserEmailFromToken();
            var user = await _repo.GetUserByEmail(email);
            if (user == null) return Ok(new { IsNewUser = true, token = "" });
            var userJwt = CreateUserJwt(user.Name, user.Email, user.ID);
            return Ok(new { IsNewUser = false, token = userJwt });
        }
        catch (Exception ex)
        {
            Log.Error($"Internal Server Error: {ex.Message}");
            return StatusCode(500, "Internal Server Error");
        }
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult> CreateUser([FromBody] UserDto userDto)
    {
        try
        {
            if (!VerifyUserEmail(userDto.Email)) return Forbid();
            
            var user = await _repo.GetUserByEmail(userDto.Email);
            
            if (user != null) return BadRequest("User existed");
            if (!userDto.IsConsent || !userDto.IsStrictlyCookiesConsent) return BadRequest("User not consent");
            var userId = await _repo.CreateUser(userDto);
            if (userId == null) return BadRequest("Unexpected Error");

            var userJwt = CreateUserJwt(userDto.Name, userDto.Email, userId);

            return StatusCode(201, new
            {
                token = userJwt
            });
        }
        catch (Exception ex)
        {
            Log.Error($"Internal Server Error: {ex.Message}");
            return StatusCode(500, "Internal Server Error");
        }
    }
    
    
}