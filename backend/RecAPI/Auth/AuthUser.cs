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
        public List<string> Roles { get; set; }

        public bool AddRole(
            string newRole
            )
        {
            if (Roles == null)
            {
                Roles = new List<string>();
            }
            if (!Roles.Contains(newRole))
            {
                Roles.Add(newRole);
            }
            return Roles.Contains(newRole);
        }
        public bool RemoveRole(
            string oldRole
            )
        {
            if (Roles == null || !Roles.Contains(oldRole))
            {
                return false;
            }
            return Roles.Remove(oldRole);
        }
    }
}