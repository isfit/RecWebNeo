using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace RecAPI.Auth.Models
{
    public class AuthUser
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonRequired]
        public string Id { get; set; }
        [BsonRequired]
        public string Email { get; set; }
        [BsonRequired]
        public string PassHash { get; set; }
        public byte[] Salt { get; set; }
    }
}