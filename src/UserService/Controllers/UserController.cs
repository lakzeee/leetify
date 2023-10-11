using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Entities;
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
        return claim?[3].Value;
    }

    private string GetUserImageFromToken()
    {
        var identity = HttpContext.User.Identity as ClaimsIdentity;
        IList<Claim> claim = identity?.Claims.ToList();
        return claim?[2].Value;
    }

    private string GetUserUserNameFromToken()
    {
        var identity = HttpContext.User.Identity as ClaimsIdentity;
        IList<Claim> claim = identity?.Claims.ToList();
        return claim?[0].Value;
    }
    

    [Authorize]
    [HttpGet("login/{provider}")]
    public async Task<ActionResult<User>> GetUserByEmail(string provider)
    {
        try
        {
            var email = GetUserEmailFromToken();
            var user = await _repo.GetUserByEmail(email);

            if (user == null)
            {
                var newUser = new User
                {
                    Email = email,
                    AuthProvider = provider,
                    Sub = GetUserSubFromToken(),
                    Image = GetUserImageFromToken(),
                    Name = GetUserUserNameFromToken(),
                    ProfileName = GetUserUserNameFromToken(),
                    IsConsent = true,
                    IsStrictlyCookiesConsent = true,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };
                await newUser.SaveAsync();
                return Ok(new { IsNewUser = true });
            }
            else
            {
                return Ok(new { IsNewUser = false });
            }
            
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

    [HttpGet("public/{sub}")]
    public async Task<ActionResult<PublicUserInfoDto>> GetPublicUserInfo(string sub)
    {
        try
        {
            var user = await _repo.GetUserByUserSub(sub);
            if (user == null) return NotFound();
            return Ok(_mapper.Map<PublicUserInfoDto>(user));
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

    [HttpGet("count")]
    public async Task<ActionResult> GetUsersCount()
    {
        try
        {
            var count = (int)await _repo.GetUsersCount();
            return Ok(count);
        }
        catch (Exception ex)
        {
            Log.Error($"Internal Server Error: {ex.Message}");
            return StatusCode(500, "Internal Server Error");
        }
    }
    
}