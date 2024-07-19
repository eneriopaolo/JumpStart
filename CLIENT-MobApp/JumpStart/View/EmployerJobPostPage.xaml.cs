using Microsoft.Maui.ApplicationModel.Communication;
using Microsoft.Maui.Controls;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace JumpStart
{
    public partial class EmployerJobPostPage : ContentPage
    {
        private readonly HttpClient _httpClient = new HttpClient();
        public string url = "https://jumpstart-07yi.onrender.com/api/job";
        //public string token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyM0BnbWFpbC5jb20iLCJpYXQiOjE3MjE0MDE5ODksImV4cCI6MTcyMTY2MTE4OX0.ZCf97YHCzeOtjKNAud21L44C-Gzr1Z9EiqU47riafFs";
        public string token;
        public EmployerJobPostPage()
        {
            
            InitializeComponent();
            LoadToken();
        }

        private void LoadToken()
        {
            string tokenFilePath = Path.Combine(FileSystem.AppDataDirectory, "token.txt");
            if (File.Exists(tokenFilePath))
            {
                token = File.ReadAllText(tokenFilePath);
            }
        }

        private async void OnPostJobOfferClicked(object sender, EventArgs e)
        {
            // Handle the post job offer button click event
            string jobTitle = jobTitleEntry.Text;
            string jobDescription = jobDescriptionEditor.Text;
            string skillsRequired = skillsRequiredEntry.Text;
            string experienceLevel = experienceLevelPicker.SelectedItem?.ToString();
            string salary = salaryEntry.Text;

            if (string.IsNullOrWhiteSpace(jobTitle) || string.IsNullOrWhiteSpace(jobDescription) ||
                string.IsNullOrWhiteSpace(skillsRequired) || string.IsNullOrWhiteSpace(experienceLevel) ||
                string.IsNullOrWhiteSpace(salary))
            {
                await DisplayAlert("Error", "Please fill all necessary fields", "OK");
                return;
            }

            // Post the job offer
            await DisplayAlert("Success", "Job offer posted successfully", "OK");

            // Navigate back or to another page

            var jobOffer = new
            {
                jobTitle = jobTitle,
                jobDescription = jobDescription,
                salaryPerMonth = Convert.ToInt32(salary),
                jobCategory = experienceLevel
            };

            try
            {
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
                var response = await _httpClient.PostAsJsonAsync("https://jumpstart-07yi.onrender.com/api/job", jobOffer);
                if (response.IsSuccessStatusCode)
                {
                    // Log the successful response
                    var content = await response.Content.ReadAsStringAsync();
                    Console.WriteLine("Registration successful. Response content: " + content);
                    await DisplayAlert("Registration", "User registered successfully!", "OK");
                    await Navigation.PopAsync();
                }
                else
                {
                    var errorContent = await response.Content.ReadAsStringAsync();
                    Console.WriteLine("Registration failed. Status code: " + response.StatusCode);
                    Console.WriteLine("Error content: " + errorContent);
                    await DisplayAlert("Error", errorContent, "OK");
                }
            }
        
            catch (Exception ex)
            {
                // Log any exceptions that occur
                Console.WriteLine("Exception occurred: " + ex.Message);
                await DisplayAlert("Error", ex.Message, "OK");
            }
        }
        

        private async void OnCancelClicked(object sender, EventArgs e)
            {
                // Handle the cancel button click event
                await Navigation.PopAsync();
            }
    }
}
