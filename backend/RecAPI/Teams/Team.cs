using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;
using RecAPI.Resolvers;
using RecAPI.Positions.Models;
using RecAPI.Sections.Models;

namespace RecAPI.Teams.Models
{
    public class Team : ISectionConnection
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
        [SectionResolver]
        public string Section { get; set; }
        
        [PositionResolverTeam]
        public List<Position> Positions { get; }
    }

    public interface ITeamConnection
    {
        string Team { get; set; }
    }
    public interface ITeamsConnection
    {
        List<string> Teams { get; set; }
    }
}