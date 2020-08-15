using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace RecAPI.Interviews.Models
{
    public class Interview
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonRequired]
        public string Id { get; set; }
        
        public DateTime Start { get; set; }
        public DateTime End { get; set; }

        public string Application { get; set; }
        public string Applicant { get; set; }
        public List<string> Interviewers { get; set; }

        public string Type { get; set; } // Digital or Physical?
        public string Location { get; set; }
    }
}