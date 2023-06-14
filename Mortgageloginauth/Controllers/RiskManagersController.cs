using Microsoft.AspNetCore.Mvc;
using Mortgageloginauth.Models;
using Mortgageloginauth.Services;

namespace Mortgageloginauth.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    public class RiskManagersController : Controller
    {
        private readonly IRiskManagersServices _services;
        public RiskManagersController(IRiskManagersServices services)
        {
            _services = services;
        }
        [HttpGet]
        public Task<Response> CheckAuth(string name, string pwd)
        {
            return _services.CheckAuth(name,pwd);
        }
        [HttpPost]
        public Task<Response> Login([FromBody]Credentials data)
        {
            return _services.Login( data.name, data.pwd);
        }


    }
}
