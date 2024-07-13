using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JumpStart.Model
{
    public class JobOffer
    {
        public string _id { get; set; }
        public string jobTitle { get; set; }
        public string jobDescription { get; set; }
        public int salaryPerMonth { get; set; }
        public string jobCategory { get; set; }
        public List<string>? skillsRequired { get; set; }
        public OfferedBy offeredBy { get; set; }
        public List<string>? applications { get; set; }
        public DateTime dateOffered { get; set; }
        public class OfferedBy
        {
            public EmployerProfile profile { get; set; }
        }
        public class EmployerProfile
        {
            public string _id { get; set; }
            public string name { get; set; }
            public string email { get; set; }
            public string? address { get; set; }
            public string? description { get; set; }
        }
    }
}
