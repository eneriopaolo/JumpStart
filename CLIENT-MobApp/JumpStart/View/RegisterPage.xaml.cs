using Microsoft.Maui.Controls;
using Microsoft.Maui.Controls.Xaml;
using System;
using System.Net.Http;
using System.Net.Http.Json;  // Required for PostAsJsonAsync
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
                var response = await _httpClient.PostAsJsonAsync("http://localhost:3000/api/auth/register", user);
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
                await DisplayAlert("Error", ex.Message,  "OK");
            }
        }

        private async void OnLoginClicked(object sender, EventArgs e)
        {
            await Navigation.PopAsync(); // Navigate back to LoginPage
        }
    }
}
