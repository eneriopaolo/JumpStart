using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JumpStart.Model
{
    public class Employer
    {
        public string _id { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public EmployerProfile profile { get; set; }

        public class EmployerProfile
        {
            public string? address { get; set; }
            public string? description { get; set; }
        }
    }
}
