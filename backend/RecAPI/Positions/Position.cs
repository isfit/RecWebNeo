using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;
using RecAPI.Resolvers;
using RecAPI.Sections.Models;
using RecAPI.AdmisionPeriodes.Models;
using RecAPI.Teams.Models;

namespace RecAPI.Positions.Models
{
    public class Position : ISectionConnection, IAdmisionPeriodeConnection, ITeamConnection
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonRequired]
        public string Id { get; set; }

        [BsonRequired]
        public string Name { get; set; }

        [BsonRequired]
        public string Description { get; set; }

        [AdmisionPeriodeResolver]
        public string AdmisionPeriode { get; set; }

        [SectionResolver]
        public string Section { get; set; }

        [TeamResolver]
        public string Team { get; set; }

        public List<string> Tags { get; set; }
        [PrefferedInterviewersResolver]
        public List<string> PrefferedInterviewers { get; set; }
    }

    public interface IPositionConnection
    {
        string Positions { get; set; }
    }
}