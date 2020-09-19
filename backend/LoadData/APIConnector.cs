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
            var LoginMutationObject = new {
                query = @"mutation login($email: String!, $password: String!) {
                          login(email: $email, password: $password)
                        }}",
                variables = @"{
                              'email': 'admin@isfit.com',
                              'password': '123456'
                               }"
            };
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Post,
                Content = new StringContent(JsonConvert.SerializeObject(LoginMutationObject), Encoding.UTF8, "application/json")
            };

            dynamic responseObj;
            using(var response = await client.SendAsync(request))
            {
                response.EnsureSuccessStatusCode();
                var responseString = await response.Content.ReadAsStringAsync();
                responseObj = JsonConvert.DeserializeObject<dynamic>(responseString);
            }
            Console.WriteLine(responseObj.data);
            var noe = responseObj.data;
            return responseObj.data;
            /*
            var content = new StringContent(requestData.ToString(), Encoding.UTF8, "application/json");
            Console.WriteLine("Content:");
            Console.WriteLine("To string", requestData.ToString());
            HttpResponseMessage response = await client.PostAsync(
                    "/",
                    content
                );
            Console.WriteLine(response.ReasonPhrase);
            Console.WriteLine(response.Content.ReadAsStringAsync().Result);
            //response.EnsureSuccessStatusCode();
            string data = response.Content.ReadAsStringAsync().Result;
            //string statusCode = response.StatusCode.GetResponse();
            Console.WriteLine("Key:", response);
            return "Key...";
            */
        }

    }










    /*
    {
        var httpClient = new HttpClient
        {
            BaseAddress = new Uri("https://api.github.com/graphql")
        };

        httpClient.DefaultRequestHeaders.Add("User-Agent", "MyConsoleApp");

        string basicValue = Convert.ToBase64String(Encoding.UTF8.GetBytes($"{Configs.GithubAccount}:{Configs.PersonalToken}"));
        httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", basicValue);

        var queryObject = new
        {
            query = @"query { 
                viewer { 
                login
                }
            }",
            variables = new { }
        };

        var request = new HttpRequestMessage
        {
            Method = HttpMethod.Post,
            Content = new StringContent(JsonConvert.SerializeObject(queryObject), Encoding.UTF8, "application/json")
        };

        dynamic responseObj;

        using (var response = await httpClient.SendAsync(request))
        {
            response.EnsureSuccessStatusCode();

            var responseString = await response.Content.ReadAsStringAsync();
            responseObj = JsonConvert.DeserializeObject<dynamic>(responseString);
        }

        Console.WriteLine(responseObj.data.viewer.login);
        Console.ReadLine();
    }
    */
}
