using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using RecAPI.Resolvers;
using RecAPI.Users.Models;

namespace RecAPI.Interviews.Models
{
    public class Interview
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonRequired]
        public string Id { get; set; }
        
        public DateTime Start { get; set; }

        public string Application { get; set; }
        public InterviewConnections Applicant { get; set; }
        public List<InterviewConnections> Interviewers { get; set; }

        //public string Type { get; set; } // Digital or Physical?
        public string Location { get; set; }  // Physical address/room, or digital link
    }

    public class InterviewConnections : IUserConnection
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonRequired]
        public string Id { get; set; }

        [UserResolver]
        public string User { get; set; }

        public bool Accepted { get; set; }
    }
}