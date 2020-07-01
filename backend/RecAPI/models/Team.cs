using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;
using RecAPI.Resolvers;

namespace RecAPI.Models
{
    public class Team
    {
         public Team(
            string name,
            string description,
            string section
        )
        {
            Name = name;
            Description = description;
            Section = section;
        }
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonRequired]
        public string Id { get; set; }
        [BsonRequired]
        public string Name { get; set; }
        [BsonRequired]
        public string Description { get; set; }
        [BsonRequired]
        public string Section { get; set; }
        
        [GetTeamPositionsResolverAtribute]
        public List<Position> Positions { get; }
    }
}