using Microsoft.Maui.Controls;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Threading.Tasks;

namespace JumpStart
{
    public partial class EmployerPage : ContentPage
    {
        public string url = "https://jumpstart-07yi.onrender.com/api/job";
        public string token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyM0BnbWFpbC5jb20iLCJpYXQiOjE3MjE0MDE5ODksImV4cCI6MTcyMTY2MTE4OX0.ZCf97YHCzeOtjKNAud21L44C-Gzr1Z9EiqU47riafFs";
        //public string token;
        public EmployerPage()
        {
            InitializeComponent();
            //LoadToken();
            //LoadApplications();
        }


        private void LoadToken()
        {
            string tokenFilePath = Path.Combine(FileSystem.AppDataDirectory, "token.txt");
            if (File.Exists(tokenFilePath))
            {
                token = File.ReadAllText(tokenFilePath);
            }
        }

        private async Task<string> FetchDataAsync(string url)
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
                var response = await client.GetAsync(url);
                response.EnsureSuccessStatusCode();
                var json = await response.Content.ReadAsStringAsync();
                Console.WriteLine($"Raw JSON Response: {json}");
                return json;
            }
        }

        public async Task<List<JobOffer>> GetJobsAsync(string url)
        {
            var json = await FetchDataAsync(url);
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };
            return JsonSerializer.Deserialize<List<JobOffer>>(json, options);
        }
        private async void OnPostJobsClicked(object sender, EventArgs e)
        {
            // Handle the button click event
            await Navigation.PushAsync(new EmployerJobPostPage());
            // Navigate to the job posting page, if you have one
            // await Navigation.PushAsync(new JobPostingPage());
        }
    }
}