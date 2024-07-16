using System.Net.Http;
using System.Threading.Tasks;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Collections.Generic;
using System.Net.Http.Headers;

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
                return await response.Content.ReadAsStringAsync();
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
                Console.WriteLine(jobs);
                JobsCollectionView.ItemsSource = jobs;
            }
            catch (Exception ex)
            {
                // Handle exceptions
                Console.WriteLine($"Error fetching jobs: {ex.Message}");
            }
        }
    }

}
