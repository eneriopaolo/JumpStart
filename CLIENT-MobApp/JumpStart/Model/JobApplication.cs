using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace JumpStart.Model
{
    public class JobApplication
    {
        [JsonPropertyName("_id")]
        public string Id { get; set; }

        [JsonPropertyName("applicant")]
        public Applicant Applicantt { get; set; }

        [JsonPropertyName("jobOffer")]
        public JobOffer JobOfferr { get; set; }

        [JsonPropertyName("applicationDate")]
        public DateTime ApplicationDate { get; set; }

        [JsonPropertyName("__v")]
        public int Version { get; set; }

        [JsonPropertyName("applicationStatus")]
        public string ApplicationStatus { get; set; }

        public class Applicant
        {
            [JsonPropertyName("profile")]
            public Profile Profile { get; set; }

            [JsonPropertyName("_id")]
            public string Id { get; set; }

            [JsonPropertyName("name")]
            public string Name { get; set; }

            [JsonPropertyName("email")]
            public string Email { get; set; }

            [JsonPropertyName("__v")]
            public int Version { get; set; }
        }

        public class Profile
        {
            [JsonPropertyName("skills")]
            public List<string> Skills { get; set; }

            [JsonPropertyName("bio")]
            public string Bio { get; set; }
        }

        public class JobOffer
        {
            [JsonPropertyName("_id")]
            public string Id { get; set; }

            [JsonPropertyName("jobTitle")]
            public string JobTitle { get; set; }

            [JsonPropertyName("jobDescription")]
            public string JobDescription { get; set; }

            [JsonPropertyName("salaryPerMonth")]
            public int SalaryPerMonth { get; set; }

            [JsonPropertyName("skillsRequired")]
            public List<string> SkillsRequired { get; set; }

            [JsonPropertyName("offeredBy")]
            public string OfferedBy { get; set; }

            [JsonPropertyName("applications")]
            public List<string> Applications { get; set; }

            [JsonPropertyName("dateOffered")]
            public DateTime DateOffered { get; set; }

            [JsonPropertyName("__v")]
            public int Version { get; set; }
        }
    }
}
