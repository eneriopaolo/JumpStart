using System.Net.Http.Headers;
using System.Text.Json.Serialization;

namespace JumpStart
{
    public partial class JobOfferDetailPage : ContentPage
    {
        public string url = "";
        public string token = "";
        private string _jobOfferId;

        public JobOfferDetailPage(string jobOfferID)
        {
            InitializeComponent();
            _jobOfferId = jobOfferID;
            LoadJobOffer($"https://jumpstart-07yi.onrender.com/api/job/myoffer/{jobOfferID}");
        }

        private async Task LoadJobOffer(string url)
        {
            // Fetch Tokens
            string tokenFilePath = Path.Combine(FileSystem.AppDataDirectory, "token.txt");
            if (File.Exists(tokenFilePath))
            {
                token = File.ReadAllText(tokenFilePath);
            }

            // REST API Call
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
                var response = await client.GetAsync(url);
                response.EnsureSuccessStatusCode();
                var json = await response.Content.ReadAsStringAsync();
                Console.WriteLine($"Raw JSON Response: {json}");

                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                };
                var jobOffer = JsonSerializer.Deserialize<EmployerOffer>(json, options);

                // Bind the job offer details
                JobOfferCollectionView.ItemsSource = new List<EmployerOffer> { jobOffer };

                // Bind the list of applicants
                ApplicantsCollectionView.ItemsSource = jobOffer.Applications;
            }
        }
        private async void OnDeleteButtonClicked(object sender, EventArgs e)
        {
            await DeleteJobOffer();
        }


        private async Task DeleteJobOffer()
        {
            // Fetch Tokens
            string tokenFilePath = Path.Combine(FileSystem.AppDataDirectory, "token.txt");
            if (File.Exists(tokenFilePath))
            {
                token = File.ReadAllText(tokenFilePath);
            }

            // REST API Call
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
                var response = await client.DeleteAsync($"https://jumpstart-07yi.onrender.com/api/job/myoffer/{_jobOfferId}");

                if (response.IsSuccessStatusCode)
                {
                    await DisplayAlert("Success", "Job offer deleted successfully.", "OK");
                    // Optionally, navigate back or refresh the page
                    await Navigation.PopAsync();
                }
                else
                {
                    await DisplayAlert("Error", "Failed to delete job offer.", "OK");
                }
            }
        }


    }
}
