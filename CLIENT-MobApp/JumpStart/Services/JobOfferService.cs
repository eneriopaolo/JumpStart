using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;

namespace JumpStart.Services
{
    internal class JobOfferService
    {
        HttpClient _httpClient;
        List<JobOffer> jobOfferList = new();

        public JobOfferService()
        {
            _httpClient = new HttpClient();
        }
        public async Task<List<JobOffer>> GetJobOffers()
        {
            if(jobOfferList.Count > 0)
                return jobOfferList;

            var url = "";
            var response = await _httpClient.GetAsync(url);

            if (response.IsSuccessStatusCode)
            {
                jobOfferList = await response.Content.ReadFromJsonAsync<List<JobOffer>>();
            }

            return jobOfferList;
        }
    }
}
