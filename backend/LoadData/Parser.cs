using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using LoadData.Connector.Models;

namespace LoadData
{
    class Parser
    {

        private string _contentSplit = "===";
        private string[] _contentCategory = new string []{
            "Title:",
            "Description:", 
            "Team:", 
            "Section:",
            "Contact:"
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
                    )
                    .Select(x => x.Trim())
                    .Where(x => !string.IsNullOrEmpty(x))
                    .ToList();
                if (positionValues != null && positionValues.Count() > 0)
                {
                    var contactInfo = positionValues[4].Split(',').ToList();
                    var contact = new Contact()
                    {
                        Name = contactInfo[0],
                        PhoneNumer = contactInfo[1],
                        Email = contactInfo[2]
                    };
                    var team = new Team()
                    {
                        Name = positionValues[2]
                    };
                    var section = new Section()
                    {
                        Name = positionValues[3]
                    };
                    var position = new Position()
                    {
                        Name = positionValues[0],
                        Description = positionValues[1],
                        Team = team,
                        Section = section,
                        Contact = contact,
                    };
                    positions.Add(position);
                }
            }
            return positions;
        }
    }
}
