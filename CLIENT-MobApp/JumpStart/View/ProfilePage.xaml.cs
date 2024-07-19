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
                            CompanyNameLabel.Text = profileData.Name ?? string.Empty;
                            ProfileIdLabel.Text = profileData._id ?? string.Empty;
                            AddressEditor.Text = profileData.Profile?.Address ?? string.Empty;
                            DescriptionEditor.Text = profileData.Profile?.Description ?? string.Empty;
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

            if (_userType == "jobseeker")
            {
                if (NameLabel == null || BioEditor == null || EducationEditor == null || ExperienceEditor == null || SkillsEditor == null)
                {
                    await DisplayAlert("Error", "One or more fields are not initialized.", "OK");
                    return;
                }

                var updatedProfile = new
                {
                    name = NameLabel.Text ?? string.Empty,
                    email = EmailEditor.Text ?? string.Empty,
                    profile = new
                    {
                        bio = BioEditor.Text ?? string.Empty,
                        education = EducationEditor.Text ?? string.Empty,
                        experience = ExperienceEditor.Text ?? string.Empty,
                        skills = SkillsEditor.Text?.Split(new[] { ", " }, StringSplitOptions.RemoveEmptyEntries) ?? Array.Empty<string>()
                    }
                };

                try
                {
                    _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", _token);
                    var response = await _httpClient.PatchAsJsonAsync($"https://jumpstart-07yi.onrender.com/api/profile/jobseeker/{_userId}", updatedProfile);
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
            else if (_userType == "employer")
            {
                if (NameLabel == null || AddressEditor == null || DescriptionEditor == null || EmailEditor == null)
                {
                    await DisplayAlert("Error", "One or more fields are not initialized.", "OK");
                    return;
                }

                var updatedProfile = new
                {
                    name = NameLabel.Text ?? string.Empty,
                    email = EmailEditor.Text ?? string.Empty,
                    profile = new
                    {
                        address = AddressEditor.Text ?? string.Empty,
                        description = DescriptionEditor.Text ?? string.Empty
                    }
                };

                try
                {
                    _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", _token);
                    var response = await _httpClient.PatchAsJsonAsync($"https://jumpstart-07yi.onrender.com/api/profile/employer/{_userId}", updatedProfile);
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
            else
            {
                await DisplayAlert("Error", "Unknown user type.", "OK");
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
    }
}
