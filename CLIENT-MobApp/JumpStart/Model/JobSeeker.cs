using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JumpStart.Model
{
    public class JobSeeker
    {
        public string _id { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public JobSeekerProfile profile { get; set; }
        public class JobSeekerProfile
        {
            public string? bio { get; set; }
            public string? education { get; set; }
            public string? experience { get; set; }
            public List<string>? skills { get; set; }
        }
    }
}
