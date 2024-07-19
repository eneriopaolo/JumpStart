using Microsoft.Maui.Controls;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using System.IO;

namespace JumpStart
{
    public partial class LoginPage : ContentPage
    {
        private readonly HttpClient _httpClient = new HttpClient();

        public LoginPage()
        {
            InitializeComponent();
        }

        private async void OnLoginClicked(object sender, EventArgs e)
        {
            string email = emailEntry.Text;
            string password = passwordEntry.Text;
            if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password))
            {
                await DisplayAlert("Error", "Please fill all necessary fields", "OK");
                return;
            }

            var user = new
            {
                email = email,
                password = password
            };

            try
            {
                var response = await _httpClient.PostAsJsonAsync("https://jumpstart-07yi.onrender.com/api/auth/login", user);

                if (response.IsSuccessStatusCode)
                {
                    var loginResponse = await response.Content.ReadFromJsonAsync<LoginResponse>();
                    if (loginResponse != null)
                    {
                        // Save token and user ID
                        string tokenFilePath = Path.Combine(FileSystem.AppDataDirectory, "token.txt");
                        string userIdFilePath = Path.Combine(FileSystem.AppDataDirectory, "userId.txt");

                        File.WriteAllText(tokenFilePath, loginResponse.token);
                        File.WriteAllText(userIdFilePath, loginResponse.userData._id);

                        // Navigate to the main page
                        if (loginResponse.userType == "jobseeker")
                        {
                            await Navigation.PushAsync(new JobOfferFeedPage());
                        }
                        else if (loginResponse.userType == "employer")
                        {
                            await Navigation.PushAsync(new EmployerPage());
                        }
                        else
                        {
                            await DisplayAlert("Alert", "Unknown user type.", "OK");
                        }
                    }
                    else
                    {
                        await DisplayAlert("Alert", "Failed to parse login response.", "OK");
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

        private async void OnRegisterClicked(object sender, EventArgs e)
        {
            await Navigation.PushAsync(new RegisterPage());
        }

        private class LoginResponse
        {
            public string token { get; set; }
            public string userType { get; set; }
            public UserData userData { get; set; }

            public class UserData
            {
                public string _id { get; set; }
                public string name { get; set; }
                public string email { get; set; }
                public Profile profile { get; set; }

                public class Profile
                {
                    public string[] skills { get; set; }
                    public string bio { get; set; }
                }
            }
        }
    }
}
