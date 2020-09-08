using Autofac;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using LoadData.Config;

namespace LoadData
{
    // https://docs.microsoft.com/en-us/aspnet/core/fundamentals/configuration/options?view=aspnetcore-3.1

    class Program
    {

        private static readonly IContainer container = Container.Initialize();

        static void Main(string[] args)
        {
            // Config
            using (var scope = container.BeginLifetimeScope())
            {
                var readDataService = scope.Resolve<IReadData>();
                readDataService.ListConfigData();
            }
            
            // Data


            //List<string> fileNames = ReadData.GetFileNames(dataPath, textExtention);

            //fileNames.ForEach(x => Console.WriteLine(x));
            /*
            string email = "admin@isfit.com";
            string password = "123456";
            APIConnector apiConnector = new APIConnector("http://localhost:5000/");

            string authKey = apiConnector.Login(email, password).Result;
            Console.WriteLine("The key is:");
            Console.WriteLine(authKey);
            Console.WriteLine("---------");
            */
        }
    }
}
