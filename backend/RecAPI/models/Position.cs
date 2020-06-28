using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace RecAPI.Models
{
    public class Position
    {
        
        public Position(
            string name,
            string description,
            List<string> tags
        )
        {
            Name = name;
            Description = description;
            Tags = tags;
        }

        public Position(
            string id,
            string name,
            string description,
            List<string> tags
        )
        {
            Id = id;
            Name = name;
            Description = description;
            Tags = tags;
        }
        
        
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonRequired]
        public string Id { get; set; }
        
        [BsonRequired]
        public string Name { get; set; }
        
        [BsonRequired]
        public string Description { get; set; }

        // AdmisionPeriode (model)

        // Deadline (Derviced from Admission periode)

        // Section (Model)

        // Team (Model) (Dependent on Section)

        public List<string> Tags { get; set; }
    }
}