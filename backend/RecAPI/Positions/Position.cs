using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;
using RecAPI.Resolvers;
using RecAPI.Sections.Models;
using RecAPI.AdmisionPeriodes.Models;

namespace RecAPI.Positions.Models
{
    public class Position : ISectionConnection, IAdmisionPeriodeConnection
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

        [TeamResolverPosition]
        public string Team { get; set; }

        public List<string> Tags { get; set; }
    }

    public interface IPositionConnection
    {
        string Positions { get; set; }
    }
}