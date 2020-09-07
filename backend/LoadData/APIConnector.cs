using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace LoadData
{
    class GraphQLInput
    {
        public static string LoginMutation()
        {
            string loginMutation = @"
                    mutation login($email: String!, $password: String!) {
                      login(email: $email, password: $password)
                    }
                ";
            return loginMutation;
        }
    }


    class APIConnector
    {

        private HttpClient client;

        public APIConnector(string baseUri)
        {
            client = new HttpClient();
            client.BaseAddress = new Uri(baseUri);
        }


        public async Task<string> Login(string email, string password)
        {
            HttpContent content = new StringContent("hello");
            HttpResponseMessage response = await client.PostAsync(
                    "/",
                    content
                );
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsStringAsync();
        }

    }
}
