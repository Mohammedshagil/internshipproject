using Microsoft.EntityFrameworkCore;
using Mortgageloginauth.Models;

namespace Mortgageloginauth.Context
{
    public class RiskManagersContext :DbContext
    {
        public RiskManagersContext( DbContextOptions<RiskManagersContext> options) : base(options)
        {
            
        }
        public DbSet<RiskManagers> RiskManagers { get; set; }
    }
}
