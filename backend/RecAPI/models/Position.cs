using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;
using RecAPI.Resolvers;
using HotChocolate.Types.Relay;

namespace RecAPI.Models
{
    public class Position
    {
        
        public Position(
            string name,
            string description,
            string team,
            List<string> tags
        )
        {
            Name = name;
            Description = description;
            Team = team;
            Tags = tags;
        }

        public Position(
            string id,
            string name,
            string description,
            string team,
            List<string> tags
        )
        {
            Id = id;
            Name = name;
            Description = description;
            Team = team;
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
        [GetTeamResolverAtribute]
        public string Team { get; set; }

        public List<string> Tags { get; set; }
    }
}