using Mortgageloginauth.Models;

namespace Mortgageloginauth.Services
{
    public interface IRiskManagersServices
    {
        Task<Response> CheckAuth(string name,string pwd);
        Task<Response> Login(string user, string pwd);
    }
}
