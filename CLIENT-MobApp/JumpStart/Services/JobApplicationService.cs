using Microsoft.Maui.Controls.PlatformConfiguration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace JumpStart.Services
{
    public class JobApplicationService
    {
        public static async Task SendApplication(string offerID)
        {
            string token = "";
            string tokenFilePath = Path.Combine(FileSystem.AppDataDirectory, "token.txt");
            if (File.Exists(tokenFilePath))
            {
                token = File.ReadAllText(tokenFilePath);
            }
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
                var response = await client.PostAsync($"https://jumpstart-07yi.onrender.com/api/application/{offerID}", null);
            }
        }
        public static async Task ApproveApplication(string applicationID)
        {
            string token = "";
            string tokenFilePath = Path.Combine(FileSystem.AppDataDirectory, "token.txt");
            if (File.Exists(tokenFilePath))
            {
                token = File.ReadAllText(tokenFilePath);
            }
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
                var response = await client.PatchAsync($"https://jumpstart-07yi.onrender.com/api/application/approve/{applicationID}", null);
            }
        }
        public static async Task DenyApplication(string applicationID)
        {
            string token = "";
            string tokenFilePath = Path.Combine(FileSystem.AppDataDirectory, "token.txt");
            if (File.Exists(tokenFilePath))
            {
                token = File.ReadAllText(tokenFilePath);
            }
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
                var response = await client.PatchAsync($"https://jumpstart-07yi.onrender.com/api/application/deny/{applicationID}", null);
            }
        }
    }
}
