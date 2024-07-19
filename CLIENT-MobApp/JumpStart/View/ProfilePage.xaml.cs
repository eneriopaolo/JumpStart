using Microsoft.Maui.Controls;
using System.Net.Http;
using System.Net.Http.Json;
using System.IO;
using System;
using Microsoft.Maui;

namespace JumpStart
{
    public partial class ProfilePage : ContentPage
    {
        private readonly HttpClient _httpClient = new HttpClient();
        private string _userId;
        private string _token;
        private string _userType;

        public ProfilePage()
        {
            InitializeComponent();
            LoadToken();
            LoadUserId();
            LoadUserType();
            LoadProfileData();
        }

        private void LoadToken()
        {
            string tokenFilePath = Path.Combine(FileSystem.AppDataDirectory, "token.txt");
            if (File.Exists(tokenFilePath))
            {
                _token = File.ReadAllText(tokenFilePath);
                Console.WriteLine($"Loaded Token: {_token}");
            }
            else
            {
                Console.WriteLine("Token file not found.");
            }
        }

        private void LoadUserId()
        {
            string userIdFilePath = Path.Combine(FileSystem.AppDataDirectory, "userId.txt");
            if (File.Exists(userIdFilePath))
            {
                _userId = File.ReadAllText(userIdFilePath);
                Console.WriteLine($"Loaded User ID: {_userId}");
            }
            else
            {
                Console.WriteLine("User ID file not found.");
            }
        }

        private void LoadUserType()
        {
            string userTypeFilePath = Path.Combine(FileSystem.AppDataDirectory, "userType.txt");
            if (File.Exists(userTypeFilePath))
            {
                _userType = File.ReadAllText(userTypeFilePath);
                Console.WriteLine($"Loaded User Type: {_userType}");
            }
            else
            {
                Console.WriteLine("User Type file not found.");
            }
        }

        private async void LoadProfileData()
        {
            if (string.IsNullOrEmpty(_token) || string.IsNullOrEmpty(_userId))
            {
                await DisplayAlert("Error", "Unauthorized Access: Token or User ID is null.", "OK");
                return;
            }

            try
            {
                _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", _token);

                string apiUrl = _userType == "jobseeker"
                    ? $"https://jumpstart-07yi.onrender.com/api/profile/jobseeker/{_userId}"
                    : $"https://jumpstart-07yi.onrender.com/api/profile/employer/{_userId}";

                var response = await _httpClient.GetAsync(apiUrl);
                var responseContent = await response.Content.ReadAsStringAsync();

                if (response.IsSuccessStatusCode)
                {
                    if (_userType == "jobseeker")
                    {
                        var profileData = await response.Content.ReadFromJsonAsync<JobSeekerProfile>();
                        if (profileData != null)
                        {
                            NameLabel.Text = profileData.Name ?? string.Empty;
                            EmailEditor.Text = profileData.Email ?? string.Empty;
                            BioEditor.Text = profileData.Profile?.Bio ?? string.Empty;
                            EducationEditor.Text = profileData.Profile?.Education ?? string.Empty;
                            ExperienceEditor.Text = profileData.Profile?.Experience ?? string.Empty;
                            SkillsEditor.Text = string.Join(", ", profileData.Profile?.Skills ?? Array.Empty<string>());

                            // Hide employer fields
                            CompanyNameLabel.IsVisible = false;
                            CompanyNameEditor.IsVisible = false;
                            ProfileIdLabel.IsVisible = false;
                            ProfileIdLabelValue.IsVisible = false;
                            AddressLabel.IsVisible = false;
                            AddressEditor.IsVisible = false;
                            DescriptionLabel.IsVisible = false;
                            DescriptionEditor.IsVisible = false;

                            // Show job seeker fields
                            BioLabel.IsVisible = true;
                            BioEditor.IsVisible = true;
                            EducationLabel.IsVisible = true;
                            EducationEditor.IsVisible = true;
                            ExperienceLabel.IsVisible = true;
                            ExperienceEditor.IsVisible = true;
                            SkillsLabel.IsVisible = true;
                            SkillsEditor.IsVisible = true;
                        }
                        else
                        {
                            await DisplayAlert("Error", "Profile data is null.", "OK");
                        }
                    }
                    else if (_userType == "employer")
                    {
                        var profileData = await response.Content.ReadFromJsonAsync<EmployerProfile>();
                        if (profileData != null)
                        {
                            NameLabel.Text = profileData.Name ?? string.Empty;
                            EmailEditor.Text = profileData.Email ?? string.Empty;
                            CompanyNameEditor.Text = profileData.Profile?.CompanyName ?? string.Empty;
                            ProfileIdLabelValue.Text = profileData._id ?? string.Empty;
                            AddressEditor.Text = profileData.Profile?.Address ?? string.Empty;
                            DescriptionEditor.Text = profileData.Profile?.Description ?? string.Empty;

                            // Show employer fields
                            CompanyNameLabel.IsVisible = true;
                            CompanyNameEditor.IsVisible = true;
                            ProfileIdLabel.IsVisible = true;
                            ProfileIdLabelValue.IsVisible = true;
                            AddressLabel.IsVisible = true;
                            AddressEditor.IsVisible = true;
                            DescriptionLabel.IsVisible = true;

                            // Hide job seeker fields
                            BioLabel.IsVisible = false;
                            BioEditor.IsVisible = false;
                            EducationLabel.IsVisible = false;
                            EducationEditor.IsVisible = false;
                            ExperienceLabel.IsVisible = false;
                            ExperienceEditor.IsVisible = false;
                            SkillsLabel.IsVisible = false;
                            SkillsEditor.IsVisible = false;
                        }
                        else
                        {
                            await DisplayAlert("Error", "Profile data is null.", "OK");
                        }
                    }
                }
                else
                {
                    Console.WriteLine($"API Response: {responseContent}");
                    await DisplayAlert("Error", $"API Error: {response.StatusCode} - {responseContent}", "OK");
                }
            }
            catch (Exception ex)
            {
                await DisplayAlert("Error", ex.Message, "OK");
            }
        }


        private async void OnEditProfileClicked(object sender, EventArgs e)
        {
            if (string.IsNullOrEmpty(_token) || string.IsNullOrEmpty(_userId))
            {
                await DisplayAlert("Error", "Unauthorized Access: Token or User ID is null.", "OK");
                return;
            }

            // Prepare the profile data to be saved
            var updatedProfile = new
            {
                name = NameLabel.Text ?? string.Empty,
                email = EmailEditor.Text ?? string.Empty,
                profile = new
                {
                    bio = _userType == "jobseeker" ? BioEditor.Text ?? string.Empty : null,
                    education = _userType == "jobseeker" ? EducationEditor.Text ?? string.Empty : null,
                    experience = _userType == "jobseeker" ? ExperienceEditor.Text ?? string.Empty : null,
                    skills = _userType == "jobseeker" ? SkillsEditor.Text?.Split(new[] { ", " }, StringSplitOptions.RemoveEmptyEntries) ?? Array.Empty<string>() : Array.Empty<string>(),
                    address = _userType == "employer" ? AddressEditor.Text ?? string.Empty : null,
                    description = _userType == "employer" ? DescriptionEditor.Text ?? string.Empty : null,
                    companyName = _userType == "employer" ? CompanyNameEditor.Text ?? string.Empty : null
                }
            };

            // Debug Alert
            var profileInfo = $"Name: {updatedProfile.name}\n" +
                              $"Email: {updatedProfile.email}\n" +
                              $"Company Name: {updatedProfile.profile.companyName}\n" +
                              $"Address: {updatedProfile.profile.address}\n" +
                              $"Description: {updatedProfile.profile.description}";

            await DisplayAlert("Saving Profile", profileInfo, "OK");

            try
            {
                _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", _token);
                var apiUrl = _userType == "jobseeker"
                    ? $"https://jumpstart-07yi.onrender.com/api/profile/jobseeker/{_userId}"
                    : $"https://jumpstart-07yi.onrender.com/api/profile/employer/{_userId}";

                var response = await _httpClient.PatchAsJsonAsync(apiUrl, updatedProfile);
                var responseContent = await response.Content.ReadAsStringAsync();

                if (response.IsSuccessStatusCode)
                {
                    await DisplayAlert("Success", "Profile Updated!", "OK");
                }
                else
                {
                    Console.WriteLine($"API Response: {responseContent}");
                    await DisplayAlert("Error", $"API Error: {response.StatusCode} - {responseContent}", "OK");
                }
            }
            catch (Exception ex)
            {
                await DisplayAlert("Error", ex.Message, "OK");
            }
        }



        private async void OnLogOutClicked(object sender, EventArgs e)
        {
            await DisplayAlert("Log Out", "Logged Out.", "OK");
            await Navigation.PopAsync(); // Go back to login page
        }
    }

    public class JobSeekerProfile
    {
        public ProfileDetails Profile { get; set; }
        public string _id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
    }

    public class EmployerProfile
    {
        public ProfileDetails Profile { get; set; }
        public string _id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
    }

    public class ProfileDetails
    {
        public string Address { get; set; }
        public string Description { get; set; }
        public string Bio { get; set; }
        public string Education { get; set; }
        public string Experience { get; set; }
        public string[] Skills { get; set; }
        public string CompanyName { get; set; }
    }
}
