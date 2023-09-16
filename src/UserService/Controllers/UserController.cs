using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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

    public UserController(IUserRepository userRepository)
    {
        _repo = userRepository;
    }

    private bool VerifyUserEmail(string email)
    {
        var identity = HttpContext.User.Identity as ClaimsIdentity;
        IList<Claim> claim = identity?.Claims.ToList();
        return email == claim?[1].Value;
    }

    [HttpGet("{email}")]
    public async Task<ActionResult<User>> GetUserByEmail(string email)
    {
        try
        {
            var user = await _repo.GetUserByEmail(email);
            if (user == null) return Ok(new { IsNewUser = true, User = "" });
            return Ok(new { IsNewUser = false, User = user });
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
            if (!userDto.IsConsent) return BadRequest("User not consent");

            var userId = await _repo.CreateUser(userDto);
            if (userId == null) return BadRequest("Unexpected Error");
            return StatusCode(201, new { userId = userId });
        }
        catch (Exception ex)
        {
            Log.Error($"Internal Server Error: {ex.Message}");
            return StatusCode(500, "Internal Server Error");
        }
    }
}