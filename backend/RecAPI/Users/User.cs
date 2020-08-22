using System;
using System.Collections.Generic;
using HotChocolate.AspNetCore.Authorization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;


namespace RecAPI.Users.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonRequired]
        public string Id { get; set; }

        [BsonRequired]
        public string AuthId { get; set; }

        [BsonRequired]
        public string Email { get; set; }

        [BsonRequired]
        public List<string> Groups { get; set; }

        [BsonRequired]
        public string FirstName { get; set; }

        [BsonRequired]
        public string LastName { get; set; }

        [BsonRequired]
        public DateTime BirtDate { get; set; }

        // Interview data
        [Authorize(Policy = "internal")]
        public List<string> Teams { get; set; }

        [Authorize(Policy = "internal")]
        public List<string> Sections { get; set; }

        [Authorize(Policy = "internal")]
        public List<string> BusyTime { get; set; }
    }
}