using System;
using System.Collections.Generic;
using System.IO;
using LoadData.Config;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Binder;
using Microsoft.Extensions.Configuration.FileExtensions;
using Microsoft.Extensions.Configuration.Json;
using LoadData.Data.Models;

namespace LoadData
{
    // https://docs.microsoft.com/en-us/aspnet/core/fundamentals/configuration/options?view=aspnetcore-3.1

    class Program
    {

        static void Main(string[] args)
        {
            /*
            Parser parser = new Parser();

            // Get config from appsettings file
            var path = Directory.GetCurrentDirectory();
            var builder = new ConfigurationBuilder()
                .SetBasePath(path)
                .AddJsonFile("appsettings.json")
                .Build();

            var dataConfig = builder.GetSection("data").Get<DataConfig>();

            // Possition 
            List<string> fileNames = ReadData.GetFileNames(
                    dataConfig.Directory,
                    dataConfig.TextExtention
                );

            List<Position> positions = new List<Position>();
            foreach(var fileName in fileNames)
            {
                var rawContent = ReadData.GetDataFromFile(path + "/" + dataConfig.Directory + fileName);
                positions.AddRange(parser.ResolvePossitions(rawContent));
            }
            */

            
            string email = "admin@isfit.com";
            string password = "123456";
            APIConnector apiConnector = new APIConnector("https://recruitment.isfit.org:5000/");

            string authKey = apiConnector.Login(email, password).Result;
            Console.WriteLine("The key is:");
            Console.WriteLine(authKey);
            Console.WriteLine("---------");
        }
    }
}
