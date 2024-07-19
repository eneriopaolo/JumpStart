using Microsoft.Maui.Controls;
using System.Net.Http;
using System.Net.Http.Json;
using System.IO;
using System;

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
            }
        }

        private void LoadUserId()
        {
            string userIdFilePath = Path.Combine(FileSystem.AppDataDirectory, "userId.txt");
            if (File.Exists(userIdFilePath))
            {
                _userId = File.ReadAllText(userIdFilePath);
            }
        }

        private void LoadUserType()
        {
            string userTypeFilePath = Path.Combine(FileSystem.AppDataDirectory, "userType.txt");
            if (File.Exists(userTypeFilePath))
            {
                _userType = File.ReadAllText(userTypeFilePath);
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

                HttpResponseMessage response;
                if (_userType == "jobseeker")
                {
                    response = await _httpClient.GetAsync($"https://jumpstart-07yi.onrender.com/api/profile/jobseeker/{_userId}");
                    SetJobSeekerUI();
                }
                else
                {
                    response = await _httpClient.GetAsync($"https://jumpstart-07yi.onrender.com/api/profile/employer/{_userId}");
                    SetEmployerUI();
                }

                var responseContent = await response.Content.ReadAsStringAsync();

                if (response.IsSuccessStatusCode)
                {
                    if (_userType == "jobseeker")
                    {
                        var profileData = await response.Content.ReadFromJsonAsync<JobSeekerProfile>();
                        if (profileData != null)
                        {
                            NameLabel.Text = profileData.Name ?? string.Empty;
                            EmailLabel.Text = profileData.Email ?? string.Empty;
                            BioEditor.Text = profileData.Profile?.Bio ?? string.Empty;
                            EducationEditor.Text = profileData.Profile?.Education ?? string.Empty;
                            ExperienceEditor.Text = profileData.Profile?.Experience ?? string.Empty;
                            SkillsEditor.Text = string.Join(", ", profileData.Profile?.Skills ?? Array.Empty<string>());
                        }
                    }
                    else
                    {
                        var profileData = await response.Content.ReadFromJsonAsync<EmployerProfile>();
                        if (profileData != null)
                        {
                            NameLabel.Text = profileData.Name ?? string.Empty;
                            EmailLabel.Text = profileData.Email ?? string.Empty;
                            AddressEditor.Text = profileData.Profile?.Address ?? string.Empty;
                            DescriptionEditor.Text = profileData.Profile?.Description ?? string.Empty;
                        }
                    }
                }
                else
                {
                    await DisplayAlert("Error", $"API Error: {response.StatusCode} - {responseContent}", "OK");
                }
            }
            catch (Exception ex)
            {
                await DisplayAlert("Error", ex.Message, "OK");
            }
        }

        private void SetJobSeekerUI()
        {
            BioLabel.IsVisible = true;
            BioEditor.IsVisible = true;
            EducationLabel.IsVisible = true;
            EducationEditor.IsVisible = true;
            ExperienceLabel.IsVisible = true;
            ExperienceEditor.IsVisible = true;
            SkillsLabel.IsVisible = true;
            SkillsEditor.IsVisible = true;

            AddressLabel.IsVisible = false;
            AddressEditor.IsVisible = false;
            DescriptionLabel.IsVisible = false;
            DescriptionEditor.IsVisible = false;
        }

        private void SetEmployerUI()
        {
            BioLabel.IsVisible = false;
            BioEditor.IsVisible = false;
            EducationLabel.IsVisible = false;
            EducationEditor.IsVisible = false;
            ExperienceLabel.IsVisible = false;
            ExperienceEditor.IsVisible = false;
            SkillsLabel.IsVisible = false;
            SkillsEditor.IsVisible = false;

            AddressLabel.IsVisible = true;
            AddressEditor.IsVisible = true;
            DescriptionLabel.IsVisible = true;
            DescriptionEditor.IsVisible = true;
        }

        private async void OnEditProfileClicked(object sender, EventArgs e)
        {
            if (string.IsNullOrEmpty(_token) || string.IsNullOrEmpty(_userId))
            {
                await DisplayAlert("Error", "Unauthorized Access: Token or User ID is null.", "OK");
                return;
            }

            var updatedProfile = new
            {
                name = NameLabel.Text ?? string.Empty,
                profile = new
                {
                    bio = _userType == "jobseeker" ? BioEditor.Text ?? string.Empty : null,
                    education = _userType == "jobseeker" ? EducationEditor.Text ?? string.Empty : null,
                    experience = _userType == "jobseeker" ? ExperienceEditor.Text ?? string.Empty : null,
                    skills = _userType == "jobseeker" ? SkillsEditor.Text?.Split(new[] { ", " }, StringSplitOptions.RemoveEmptyEntries) ?? Array.Empty<string>() : null,
                    address = _userType == "employer" ? AddressEditor.Text : null,
                    description = _userType == "employer" ? DescriptionEditor.Text : null
                }
            };

            try
            {
                _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", _token);
                HttpResponseMessage response;
                if (_userType == "jobseeker")
                {
                    response = await _httpClient.PatchAsJsonAsync($"https://jumpstart-07yi.onrender.com/api/profile/jobseeker/{_userId}", updatedProfile);
                }
                else
                {
                    response = await _httpClient.PatchAsJsonAsync($"https://jumpstart-07yi.onrender.com/api/profile/employer/{_userId}", updatedProfile);
                }

                var responseContent = await response.Content.ReadAsStringAsync();

                if (response.IsSuccessStatusCode)
                {
                    await DisplayAlert("Success", "Profile Updated!", "OK");
                }
                else
                {
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
        public EmployerProfileDetails Profile { get; set; }
        public string _id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
    }

    public class ProfileDetails
    {
        public string[] Skills { get; set; }
        public string Bio { get; set; }
        public string Education { get; set; }
        public string Experience { get; set; }
    }

    public class EmployerProfileDetails
    {
        public string Address { get; set; }
        public string Description { get; set; }
    }
}
