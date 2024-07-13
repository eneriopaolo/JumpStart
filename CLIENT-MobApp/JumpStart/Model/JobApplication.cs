using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JumpStart.Model
{
    public class JobApplication
    {
        public string _id { get; set; }
        public Applicant applicant { get; set; }
        public JobOffer jobOffer { get; set; }
        public DateTime applicationDate { get; set; }
        public string applicationStatus { get; set; }
        public class Applicant
        {
            public JobSeekerProfile profile { get; set; }
            public string _id { get; set; }
            public string name { get; set; }
            public string email { get; set; }
        }

        public class JobOffer
        {
            public string _id { get; set; }
            public string jobTitle { get; set; }
            public string jobDescription { get; set; }
            public int salaryPerMonth { get; set; }
            public List<string> skillsRequired { get; set; }
            public string offeredBy { get; set; }
            public List<string>? applications { get; set; }
            public DateTime dateOffered { get; set; }
        }

        public class JobSeekerProfile
        {
            public string? bio { get; set; }
            public string? education { get; set; }
            public string? experience { get; set; }
            public List<string>? skills { get; set; }
        }
    }
}
