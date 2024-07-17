using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Maui.Controls;

namespace JumpStart
{
    public partial class JobOfferFeedPage : ContentPage
    {
        public string url = "https://jumpstart-07yi.onrender.com/api/job";
        public string token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhdEBnbWFpbC5jb20iLCJpYXQiOjE3MjExNDA0NjMsImV4cCI6MTcyMTM5OTY2M30.1usypNEWEjTugf-BKAaVBxNsTZi7ppfyDxTHLBM9R-c";

        public JobOfferFeedPage()
        {
            InitializeComponent();
            LoadJobs();
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

        private async void LoadJobs()
        {
            try
            {
                var jobs = await GetJobsAsync(url);

                // Debugging: Print details to console
                foreach (var job in jobs)
                {
                    Console.WriteLine($"Job Title: {job.JobTitle}");
                    Console.WriteLine($"Job Description: {job.JobDescription}");
                    Console.WriteLine($"Salary: {job.SalaryPerMonth}");
                    Console.WriteLine($"Offered By: {job.OfferedBy?.ToString() ?? "null"}");
                    Console.WriteLine("-----");
                }

                JobsCollectionView.ItemsSource = jobs;
            }
            catch (Exception ex)
            {
                // Handle exceptions
                Console.WriteLine($"Error fetching jobs: {ex.Message}");
            }
        }

        private async void OnJobTapped(object sender, TappedEventArgs e)
        {
            if (e.Parameter is JobOffer jobOffer)
            {
                // Use the tapped jobOffer object here
                Console.WriteLine($"Tapped on Job: {jobOffer.JobTitle} Salary: {jobOffer.SalaryPerMonth}");

                // Display a simple alert when tapped
                await DisplayAlert("Tapped", $"You tapped on job: {jobOffer.JobTitle} Salary: {jobOffer.SalaryPerMonth}", "OK");
            }
        }
    }
}
