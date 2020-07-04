using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;
using RecAPI.Resolvers;

namespace RecAPI.Models
{
    public class Section
    {
        public Section(
            string name,
            string description
        )
        {
            Name = name;
            Description = description;
        }
        public Section(
            string id,
            string name,
            string description
        )
        {
            Id = id;
            Name = name;
            Description = description;
        }
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonRequired]
        public string Id { get; set; }
        [BsonRequired]
        public string Name { get; set; }
        [BsonRequired]
        public string Description { get; set; }
        [GetSectionTeamResolverAtribute]
        public List<Team> Teams { get; }
        public List<Position> Positions { get; }
    }
}