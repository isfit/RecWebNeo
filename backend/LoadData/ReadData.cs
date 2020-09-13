using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using LoadData.Config;

namespace LoadData
{
    public class ReadData
    {
        public static List<string> GetFileNames(string path, string textExtention)
        {
            string[] fileNames = Directory.GetFiles(path, "*." + textExtention)
                                     .Select(Path.GetFileName)
                                     .ToArray();
            return new List<string>(fileNames);
        }

        public static string GetDataFromFile(string filePath)
        {
            return File.ReadAllText(filePath);
        }
    }
}
