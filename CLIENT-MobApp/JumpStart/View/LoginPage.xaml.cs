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

                var response = await _httpClient.PostAsJsonAsync("http://localhost:3000/api/auth/login", user);

                if (response.IsSuccessStatusCode)
                {

                    var loginResponse = await response.Content.ReadFromJsonAsync<LoginResponse>();
                    if (loginResponse != null)
                    {
                        //save token
                        string tokenFilePath = Path.Combine(FileSystem.AppDataDirectory, "token.txt");
                        File.WriteAllText(tokenFilePath, loginResponse.token);

                        await DisplayAlert("Long", "User logged in successfully", "OK");


                        //nav to mainpage
                        await Navigation.PushAsync(new JobOfferFeedPage());
                    }

                    else
                    {
                        await DisplayAlert("Alert", "Failed to parse login Response.", "OK");
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
                  await DisplayAlert("Alert", "Failed to parse login Response.", "OK");

            }
        }

        private async void OnRegisterClicked(object sender, EventArgs e)
        {
            await Navigation.PushAsync(new RegisterPage());

        }

        private class LoginResponse
        {
            public string token { get; set; }
            public string user { get; set; }
            public UserData userData { get; set; }
            public string TypeofUser {  get; set; }

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
