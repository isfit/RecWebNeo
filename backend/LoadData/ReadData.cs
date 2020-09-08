using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using LoadData.Config;

namespace LoadData
{
    public interface IReadData
    {
        void ListConfigData();
        List<string> GetFileNames(string path, string textExtention);
        string GetDataFromFile(string filePath);
    }

    public class ReadData : IReadData
    {
        private readonly DataConfig _dataConfig;

        public ReadData(DataConfig dataConfig)
        {
            _dataConfig = dataConfig;
        }

        public void ListConfigData()
        {
            Console.WriteLine(_dataConfig);
        }


        public List<string> GetFileNames(string path, string textExtention)
        {
            string[] fileNames = Directory.GetFiles(path, "*." + textExtention)
                                     .Select(Path.GetFileName)
                                     .ToArray();
            return new List<string>(fileNames);
        }

        public string GetDataFromFile(string filePath)
        {
            return File.ReadAllText(filePath);
        }

    }
}
