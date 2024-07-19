using Microsoft.Maui.Controls;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Threading.Tasks;
using JumpStart.Model;

namespace JumpStart.View
{
    public partial class ViewJobApplicationsPage : ContentPage
    {
        public string url = "https://jumpstart-07yi.onrender.com/api/application";
        public string token;

        public ViewJobApplicationsPage()
        {
            InitializeComponent();
            LoadToken();
            LoadApplications();
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

        public async Task<List<JobApplication>> GetApplicationsAsync(string url)
        {
            var json = await FetchDataAsync(url);
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };
            return JsonSerializer.Deserialize<List<JobApplication>>(json, options);
        }

        private async void LoadApplications()
        {
            try
            {
                var applications = await GetApplicationsAsync(url);

                // Debugging: Print details to console
                foreach (var app in applications)
                {
                    Console.WriteLine($"Application Status: {app.ApplicationStatus}");
                    Console.WriteLine($"Application Date: {app.ApplicationDate}");
                    Console.WriteLine($"Job ID: {app.Id}");
                    Console.WriteLine("-----");
                }

                ApplicationCollectionView.ItemsSource = applications;
            }
            catch (Exception ex)
            {
                // Handle exceptions
                Console.WriteLine($"Error fetching applications: {ex.Message}");
            }
        }

        private async void OnApplicationTapped(object sender, TappedEventArgs e)
        {
            if (e.Parameter is JobApplication jobApplication)
            {
                // Use the tapped jobApplication object here
                Console.WriteLine($"Tapped on Application: {jobApplication.ApplicationStatus} Date: {jobApplication.ApplicationDate}");

                // Display a simple alert when tapped
                await DisplayAlert("Tapped", $"You tapped on application: {jobApplication.ApplicationStatus} Date: {jobApplication.ApplicationDate}", "OK");
            }
        }
    }
}
