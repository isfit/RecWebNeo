using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace RecAPI.Applications.Models
{
    public class Application
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonRequired]
        public string Id { get; set; }
        
        public Dictionary<string, string> Positions { get; set; }
        public string AdmissionPeriode { get; set; }
        public bool Prioritized { get; set; }

        public string ApplicationText { get; set;}
        public List<DateTime> Available { get; set; }

        public string Applicant { get; set; }

        //public bool PreferDigital { get; set; }
        public string Interest { get; set; }
        public void setInterest(string interest)
        {
            // This is possibly worst possible solution, and a horrible quick fix
            // TODO!
            if (interest == "OnlyPositions")
            {
                Interest = "I am only interested in the positions i have entered";
            }
            if (interest == "Same")
            {
                Interest = "I am open to other positions widthin the same genre of the positions i have entered";
            }
            if (interest == "open")
            {
                Interest = "I am open ti any other position in ISFIT, regardles of the positons i have entered";
            }
        }
    }
}