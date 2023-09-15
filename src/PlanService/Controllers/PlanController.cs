using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace PlanService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PlanController : ControllerBase
{
    [Authorize]
    [HttpGet]
    public async Task<ActionResult<string>> TestRoute()
    {
        var identity = HttpContext.User.Identity as ClaimsIdentity;
        IList<Claim> claim = identity.Claims.ToList();
        var userName = claim[1].Value;
        return "Welcome To: " + userName;
    }
}