using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using RecAPI.Users.Models;
using RecAPI.Resolvers;

namespace RecAPI.Applications.Models
{
    public class Application
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonRequired]
        public string Id { get; set; }
        
        [PositionsApplicationResolver]
        public Dictionary<string, string> Positions { get; set; }
        public string AdmissionPeriode { get; set; }
        public bool Prioritized { get; set; }

        public string ApplicationText { get; set;}
        public List<DateTime> Available { get; set; }

        [ApplicationApplicantResolver]
        public string Applicant { get; set; }

        //public bool PreferDigital { get; set; }
        public string Interest { get; set; }

        public void setInterest(string interest)
        {
            // This is possibly worst possible solution, and a horrible quick fix
            // TODO!
            if (interest == "OnlyPositions")
            {
                Interest = "OnlyPositions";
            }
            if (interest == "Same")
            {
                Interest = "Same";
            }
            if (interest == "open")
            {
                Interest = "open";
            }
        }


    }
}