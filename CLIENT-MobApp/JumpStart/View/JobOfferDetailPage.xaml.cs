using System.Net.Http.Headers;
using System.Text.Json.Serialization;

namespace JumpStart
{
    public partial class JobOfferDetailPage : ContentPage
    {
        public string url = "";
        public string token = "";
        public JobOfferDetailPage(string jobOfferID)
        {
            InitializeComponent();
            var job = LoadJobOffer($"https://jumpstart-07yi.onrender.com/api/job/myoffer/{jobOfferID}");
            Console.WriteLine(job.JobTitle);
        }
        private async Task<EmployerOffer> LoadJobOffer(string url) 
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
                return JsonSerializer.Deserialize<EmployerOffer>(json, options);
            }
        }
    }

}
