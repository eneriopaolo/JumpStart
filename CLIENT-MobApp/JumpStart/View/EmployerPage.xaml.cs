using Microsoft.Maui.Controls;
using JumpStart.View;
using JumpStart.Services;
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
        public string url = "https://jumpstart-07yi.onrender.com/api/job/myoffer";
        //public string token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhdEBnbWFpbC5jb20iLCJpYXQiOjE3MjExNDA0NjMsImV4cCI6MTcyMTM5OTY2M30.1usypNEWEjTugf-BKAaVBxNsTZi7ppfyDxTHLBM9R-c";
        public string token;
        public EmployerPage()
        {
            InitializeComponent();
            LoadToken();
            LoadMyOffers();
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
        public async Task<List<EmployerOffer>> GetJobsAsync(string url)
        {
            var json = await FetchDataAsync(url);
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };
            return JsonSerializer.Deserialize<List<EmployerOffer>>(json, options);
        }

        private async void LoadMyOffers()
        {
            try
            {
                var jobs = await GetJobsAsync(url);

                // Debugging: Print details to console
                foreach (var job in jobs)
                {
                    Console.WriteLine($"Job Title: {job.JobTitle}");
                    Console.WriteLine($"Job Description: {job.JobDescription}");
                    //Console.WriteLine($"Salary: {job.SalaryPerMonth}");

                    //Console.WriteLine($"Number of Applicants: {Convert.ToString(jobs.Count) ?? "null"}");
                    //Console.WriteLine("-----");
                }

                MyOffersCollectionView.ItemsSource = jobs;
            }
            catch (Exception ex)
            {
                // Handle exceptions
                Console.WriteLine($"Error fetching jobs: {ex.Message}");
            }
        }

        private async void OnPostJobsClicked(object sender, EventArgs e)
        {
            await Navigation.PushAsync(new EmployerJobPostPage());
        }

        private async void OnMyOfferTapped(object sender, TappedEventArgs e)
        {
            if (e.Parameter is EmployerOffer joboffer)
            {
                string jobOfferID = joboffer.Id;
                await Navigation.PushAsync(new JobOfferDetailPage(jobOfferID));
            }
        }

        private async void OnAcceptClicked(object sender, TappedEventArgs e)
        {
            if (e.Parameter is JobOffer joboffer)
            {
                string jobOfferID = joboffer.Id;
                await JobApplicationService.ApproveApplication(jobOfferID);
                await DisplayAlert("Tapped", "You have successfully sent accepted the application.", "OK");
            }
        }
        private async void OnDenyClicked(object sender, TappedEventArgs e)
        {
            if (e.Parameter is JobOffer joboffer)
            {
                string jobOfferID = joboffer.Id;
                await JobApplicationService.DenyApplication(jobOfferID);
                await DisplayAlert("Tapped", "You have successfully sent declined the application.", "OK");
            }
        }

        private async void OnProfileButtonClicked(object sender, EventArgs e)
        {
            await Navigation.PushAsync(new ProfilePage());
        }

        //private async void OnDeleteJobPost(object sender, EventArgs e)
        //{
        //    public string delUrl = "https://jumpstart-07yi.onrender.com/api/job/myoffer/";
        //}
    }
}