using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using RecAPI.Users.Models;
using RecAPI.Resolvers;
using RecAPI.AdmisionPeriodes.Models;
using RecAPI.Applications.ErrorHandling;

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

        //[AdmisionPeriodeResolver]
        // This is deffined with two ss-es insted of one. Fucked upp
        public string AdmissionPeriode { get; set; }

        public bool Prioritized { get; set; }


        public string ApplicationText { get; set;}

        public List<DateTime> Available { get; set; }


        [ApplicantResolver]
        public string Applicant { get; set; }


        //public bool PreferDigital { get; set; }

        public string Interest { get; set; }


        public void setInterest(string interest)
        {
            List<string> validInterests = new List<string>()
                {
                    "OnlyPositions",
                    "Same",
                    "Open"
                };
            if (validInterests.Contains(interest))
            {
                Interest = interest;
            } else
            {
                ApplicationError.InvalidApplicationInterest();
            }
        }


    }
}