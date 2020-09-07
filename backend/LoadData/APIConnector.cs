using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using LoadData.models;
using Newtonsoft.Json;

namespace LoadData
{
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
            LoginVariables loginVariables = new LoginVariables(){
                email = email,
                password = password
            };
            LoginRequest requestData = new LoginRequest(){
                variables = loginVariables,
                query = GraphQLInput.LoginMutation()
            };
            Console.WriteLine(JsonConvert.SerializeObject(requestData));
            HttpContent content = new StringContent(
                JsonConvert.SerializeObject(requestData)
            );
            HttpResponseMessage response = await client.PostAsync(
                    "/",
                    content
                );
            //response.EnsureSuccessStatusCode();
            string data = response.Content.ReadAsStringAsync().Result;
            //string statusCode = response.StatusCode.GetResponse();
            Console.WriteLine("Key:", response);
            return "Key...";
        }

    }
}
