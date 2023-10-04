using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
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
    private readonly IMapper _mapper;

    public UserController(IUserRepository userRepository, IConfiguration configuration, IMapper mapper)
    {
        _repo = userRepository;
        _configuration = configuration;
        _mapper = mapper;
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
    [HttpGet("isNew")]
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

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<UserInfoDto>> GetUserByUserSub()
    {
        try
        {
            var user = await _repo.GetUserByUserSub(GetUserSubFromToken());
            if (user == null) return NotFound();
            return Ok(_mapper.Map<UserInfoDto>(user));
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

    [Authorize]
    [HttpPut]
    public async Task<ActionResult> UpdateUserProfileName([FromBody] UpdateUserDto updateUserDto)
    {
        try
        {
            var res = await _repo.UpdateUserProfileName(updateUserDto.Id, updateUserDto.ProfileName,
                GetUserSubFromToken());
            if (res) return Ok();
            return BadRequest();
        }
        catch (Exception ex)
        {
            Log.Error($"Internal Server Error: {ex.Message}");
            return StatusCode(500, "Internal Server Error");
        }
    }
}