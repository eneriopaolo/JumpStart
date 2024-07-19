using Microsoft.Maui.Controls;
using System.Linq.Expressions;
using System.Net.Http.Json;

namespace JumpStart
{
    public partial class ProfilePage : ContentPage
    {
        private readonly HttpClient _httpClient = new HttpClient();
        private string _userId = "65f98c9332880435a5ba22f6"; //replace wid user ID

        public ProfilePage()
        {
            InitializeComponent();
            LoadProfileData();
        }


        private async void LoadProfileData()
        {
            try
            {
                var response = await _httpClient.GetAsync($"https://jumpstart-07yi.onrender.com/api/profile/jobseeker/{_userId}");
                if (response.IsSuccessStatusCode)
                {
                    var profileData = await response.Content.ReadFromJsonAsync<JobSeekerProfile>();
                    if (profileData != null)
                    {
                        NameLabel.Text = profileData.Name;
                        EmailLabel.Text = profileData.Email;
                        BioEditor.Text = profileData.Profile.Bio;
                        EducationEditor.Text = profileData.Profile.Education;
                        ExperienceEditor.Text = profileData.Profile.Experience;
                        SkillsEditor.Text = string.Join(", ", profileData.Profile.Skills);
                    }
                }
                else
                {
                    var errorContent = await response.Content.ReadAsStringAsync();
                    await DisplayAlert("Error", errorContent, "OK");
                }
            }
            catch (Exception ex)
            {
                await DisplayAlert("Error", ex.Message, "OK");
            }
        }
        private async void OnEditProfileClicked(object sender, EventArgs e)
        {
            var updatedProfile = new
            {
                name = NameLabel.Text,
                profile = new
                {
                    bio = BioEditor.Text,
                    education = EducationEditor.Text,
                    experience = ExperienceEditor.Text,
                    skills = SkillsEditor.Text.Split(new[] { ", " }, StringSplitOptions.RemoveEmptyEntries)

                }
            };

            try
            {
                var response = await _httpClient.PatchAsJsonAsync($"https://jumpstart-07yi.onrender.com/api/profile/jobseeker/{_userId}", updatedProfile);
                if (response.IsSuccessStatusCode)
                {
                    await DisplayAlert("Success", "Profile Updated!", "OK");

                }
                else
                {
                    var errorContent = await response.Content.ReadAsStringAsync();
                    await DisplayAlert("Error", errorContent, "OK");
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
            await Navigation.PopAsync();//go back to login page
        }
    }

    public class JobSeekerProfile
    {
        public ProfileDetails Profile { get; set; }
        public string _id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public int __v { get; set; }
    }

    public class ProfileDetails
    {
        public string[] Skills { get; set; }
        public string Bio { get; set; }
        public string Education { get; set; }
        public string Experience { get; set; }
    }
}