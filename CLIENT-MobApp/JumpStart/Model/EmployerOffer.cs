using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace JumpStart.Model
{
    public class EmployerOffer
    {
        [JsonPropertyName("_id")]
        public string Id { get; set; }

        [JsonPropertyName("jobTitle")]
        public string JobTitle { get; set; }

        [JsonPropertyName("jobDescription")]
        public string JobDescription { get; set; }

        [JsonPropertyName("salaryPerMonth")]
        public int SalaryPerMonth { get; set; }

        [JsonPropertyName("jobCategory")]
        public string JobCategory { get; set; }

        [JsonPropertyName("skillsRequired")]
        public List<string>? SkillsRequired { get; set; }

        [JsonPropertyName("offeredBy")]
        public EmployerProfile OfferedBy { get; set; }

        [JsonPropertyName("applications")]
        public List<Application>? Applications { get; set; }

        [JsonPropertyName("dateOffered")]
        public DateTime DateOffered { get; set; }

        public class EmployerProfile
        {
            [JsonPropertyName("_id")]
            public string Id { get; set; }

            [JsonPropertyName("name")]
            public string Name { get; set; }

            [JsonPropertyName("email")]
            public string Email { get; set; }

            [JsonPropertyName("__v")]
            public int Version { get; set; }

            [JsonPropertyName("profile")]
            public Profile Profile { get; set; }

            public override string ToString()
            {
                return $"ID: {Id}, Name: {Name}, Email: {Email}, Profile: {Profile?.ToString() ?? "null"}";
            }
        }

        public class Profile
        {
            [JsonPropertyName("address")]
            public string? Address { get; set; }

            [JsonPropertyName("description")]
            public string? Description { get; set; }

            public override string ToString()
            {
                return $"Address: {Address}, Description: {Description}";
            }
        }

        public class Application
        {
            [JsonPropertyName("_id")]
            public string Id { get; set; }

            [JsonPropertyName("applicant")]
            public string Applicant { get; set; }

            [JsonPropertyName("jobOffer")]
            public string JobOffer { get; set; }

            [JsonPropertyName("applicationStatus")]
            public string ApplicationStatus { get; set; }

            [JsonPropertyName("applicationDate")]
            public DateTime ApplicationDate { get; set; }

            [JsonPropertyName("__v")]
            public int Version { get; set; }
        }

    }

}
