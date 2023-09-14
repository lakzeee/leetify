using System.Linq;
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
        var userEmail = User.Claims.FirstOrDefault(c => c.Type == "email");
        if (userEmail != null && userEmail.Value != "lakcai818@gmail.com") return BadRequest();

        return Ok("hello world");
    }
}