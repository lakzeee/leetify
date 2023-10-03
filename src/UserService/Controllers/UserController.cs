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

    private string GetUserSubFromToken()
    {
        var identity = HttpContext.User.Identity as ClaimsIdentity;
        IList<Claim> claim = identity?.Claims.ToList();
        return claim?[2].Value;
    }

    private bool VerifyUserEmail(string email)
    {
        return email == GetUserEmailFromToken();
    }
    

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<User>> GetUserByEmail()
    {
        try
        {
            var email = GetUserEmailFromToken();
            var user = await _repo.GetUserByEmail(email);
            if (user == null) return Ok(new { IsNewUser = true });
            return Ok(new { IsNewUser = false });
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
            userDto.Sub = GetUserSubFromToken();
            var userId = await _repo.CreateUser(userDto);
            if (userId == null) return BadRequest("Unexpected Error");

            return StatusCode(201);
        }
        catch (Exception ex)
        {
            Log.Error($"Internal Server Error: {ex.Message}");
            return StatusCode(500, "Internal Server Error");
        }
    }
    
    
}