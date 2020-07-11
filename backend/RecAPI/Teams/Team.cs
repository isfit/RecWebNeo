using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;
using RecAPI.Resolvers;
using RecAPI.Positions.Models;

namespace RecAPI.Teams.Models
{
    public class Team
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonRequired]
        public string Id { get; set; }
        [BsonRequired]
        public string Name { get; set; }
        [BsonRequired]
        public string Description { get; set; }
        [BsonRequired]
        [GetTeamSectionResolverAtribute]
        public string Section { get; set; }
        
        [GetTeamPositionsResolverAtribute]
        public List<Position> Positions { get; }
    }
}