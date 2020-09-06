using System;
using System.Collections.Generic;

namespace LoadData
{
    class Program
    {
        static void Main(string[] args)
        {
            // Data
            string dataPath = "data/";


            List<string> fileNames = ReadData.GetFileNames(dataPath);

            fileNames.ForEach(x => Console.WriteLine(x));

        }
    }
}
