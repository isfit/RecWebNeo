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
        
        public Dictionary<int, string> Positions { get; set; }
        public string AdmissionPeriode { get; set; }
        public bool Prioritized { get; set; }

        public string ApplicationText { get; set;}
        public List<DateTime> Available { get; set; }

        [BsonId]
        [BsonRequired]
        public string Applicant { get; set; }

        public bool PreferDigital { get; set; }
    }
}