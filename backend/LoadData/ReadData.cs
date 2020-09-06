using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace LoadData
{
    class ReadData
    {
        
        public static List<string> GetFileNames(string path)
        {
            string[] fileNames = Directory.GetFiles(path, "*.txt")
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
