using Microsoft.Maui.Controls;
using System;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;

namespace JumpStart
{
    public partial class RegisterPage : ContentPage
    {
        private readonly HttpClient _httpClient = new HttpClient();

        public RegisterPage()
        {
            InitializeComponent();
        }

        private async void OnRegisterClicked(object sender, EventArgs e)
        {
            string email = emailEntry.Text;
            string name = nameEntry.Text;
            string password = passwordEntry.Text;
            string userType = userTypePicker.SelectedItem?.ToString().ToLower() ?? "jobseeker";

            userType = userType switch
            {
                "Job Seeker" => "jobseeker",
                "Employer" => "employer",
                _ => "jobseeker"
            };

            if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(password))
            {
                await DisplayAlert("Error", "Please fill in all fields.", "OK");
                return;
            }

            var user = new
            {
                email = email,
                name = name,
                password = password,
                typeofuser = userType
            };

            try
            {
                var response = await _httpClient.PostAsJsonAsync("https://jumpstart-07yi.onrender.com/api/auth/register", user);

                if (response.IsSuccessStatusCode)
                {
                    await DisplayAlert("Success", "Registration Successful!", "OK");
                    await Navigation.PopAsync(); // Go back to login page
                }
                else
                {
                    var errorContent = await response.Content.ReadAsStringAsync();
                    Console.WriteLine($"API Response: {errorContent}");
                    await DisplayAlert("Error", $"API Error: {response.StatusCode} - {errorContent}", "OK");
                }
            }
            catch (Exception ex)
            {
                await DisplayAlert("Error", ex.Message, "OK");
            }
        }
        private async void OnLoginClicked(object sender, EventArgs e)
        {
            await Navigation.PopAsync(); // Navigate back to LoginPage
        }
    }
}
