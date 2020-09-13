using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using LoadData.Data.Models;

namespace LoadData
{
    class Parser
    {

        private string _contentSplit = "===";
        private string[] _contentCategory = new string []{
            "Name",
            "Description", 
            "Team", 
            "Section"
        };


        public List<Position> ResolvePossitions(string text)
        {
            List<string> content = text.Split(_contentSplit).ToList();
            List<Position> positions = new List<Position>();
            foreach(var positionText in content)
            {
                List<string> positionValues = positionText.Split(
                        _contentCategory,
                        StringSplitOptions.RemoveEmptyEntries
                    ).ToList();
                positionValues.ForEach(x => Console.WriteLine(x));
            }
            return null;
        }
    }
}
