using System.ComponentModel.DataAnnotations;

namespace Mortgageloginauth.Models
{
    public class RiskManagers
    {
        [Key]public int RiskManagerId { get; set; }
        public string? RiskManagerMail { get; set; }
        public string? RiskManagerPassword { get; set; }
        public string? RiskManagerAccess { get; set; }
    }
}
