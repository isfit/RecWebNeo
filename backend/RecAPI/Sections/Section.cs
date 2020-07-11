using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;
using RecAPI.Resolvers;
using RecAPI.Teams.Models;
using RecAPI.Positions.Models;

namespace RecAPI.Sections.Models
{
    public class Section
    {
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
        [GetSectionPositionsResolverAtribute]
        public List<Position> Positions { get; }
        public string Organization { get; set; }
    }
}