using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LoadData
{
    class Program
    {
        static void Main(string[] args)
        {
            // Data
            string dataPath = "data/";
            string textExtention = "txt";


            //List<string> fileNames = ReadData.GetFileNames(dataPath, textExtention);

            //fileNames.ForEach(x => Console.WriteLine(x));

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
