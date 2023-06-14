using Microsoft.EntityFrameworkCore;
using Mortgageloginauth.Context;
using Mortgageloginauth.Models;
namespace Mortgageloginauth.Services
{
    public class RiskManagersServices : IRiskManagersServices
 
    {
        public readonly RiskManagersContext _Auth;
        public RiskManagersServices(RiskManagersContext Auth)
        {
            _Auth = Auth;
        }
        public async Task<Response> CheckAuth(string user,string pwd)
        {
            var data = await  _Auth.RiskManagers.ToListAsync();
            //var username = data[0].Username;
            //var passd = data[0].UserPassword;
            //if(user == username && pwd == passd)
            //{
            //    return true;
            //}
            //else
            //{
            //    return false;
            //}

            for(int i=0; i<data.Count; i++)
            {
                if ((data[i].RiskManagerMail == user) && (data[i].RiskManagerPassword == pwd))
                {
                    Response responses = new Response();
                    responses.Status = "success";
                    responses.Message = "login success";
                    return responses;
                }
            }
            Response response = new Response();
            response.Status = "successFailed";
            response.Message = "loginFailed";
            return response;
        }
        public async Task<Response> Login(string user, string pwd)
        {
            var data = await _Auth.RiskManagers.ToListAsync();
            //var username = data[0].Username;
            //var passd = data[0].UserPassword;
            //if(user == username && pwd == passd)
            //{
            //    return true;
            //}
            //else
            //{
            //    return false;
            //}

            for (int i = 0; i < data.Count; i++)
            {
                if ((data[i].RiskManagerMail == user) && (data[i].RiskManagerPassword == pwd) && data[i].RiskManagerAccess=="allow")
                {
                    Response responses = new Response();
                    responses.Status = "success";
                    responses.Message = "login success";
                    return responses;
                }
            }
            Response response = new Response();
            response.Status = "successFailed";
            response.Message = "Access Denied";
            return response;
        }
    }
}
