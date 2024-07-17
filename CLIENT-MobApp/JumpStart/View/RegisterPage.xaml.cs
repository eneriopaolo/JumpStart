using Microsoft.Maui.Controls;

namespace JumpStart
{
    public partial class RegisterPage : ContentPage
    {
        public RegisterPage()
        {
            InitializeComponent();
        }

        private async void OnRegisterClicked(object sender, EventArgs e)
        {
            string email = emailEntry.Text;
            string name = nameEntry.Text;
            string password = passwordEntry.Text;

            // Simple registration logic no data save yet
            if (!string.IsNullOrWhiteSpace(email) && !string.IsNullOrWhiteSpace(name) && !string.IsNullOrWhiteSpace(password))
            {
                
                await DisplayAlert("Registration", "User registered successfully!", "OK");
                await Navigation.PopAsync(); // Navigate back to LoginPage
            }
            else
            {
                await DisplayAlert("Error", "Please fill in all fields.", "OK");
            }
        }

        private async void OnLoginClicked(object sender, EventArgs e)
        {
            await Navigation.PopAsync(); // Navigate back to LoginPage
        }
    }
}
