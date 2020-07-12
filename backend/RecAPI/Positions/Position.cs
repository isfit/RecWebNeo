using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;
using RecAPI.Resolvers;

namespace RecAPI.Positions.Models
{
    public class Position
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonRequired]
        public string Id { get; set; }
        [BsonRequired]
        public string Name { get; set; }
        [BsonRequired]
        public string Description { get; set; }
        [AdmisionPeriodeResolverPosition]
        public string AdmisionPeriode { get; set; }
        [SectionResolverPosition]
        public string Section { get; set; }
        [TeamResolverPosition]
        public string Team { get; set; }
        public List<string> Tags { get; set; }
    }
}