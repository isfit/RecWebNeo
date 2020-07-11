using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;
using RecAPI.Sections.Models;
using RecAPI.AdmisionPeriodes.Model;
using RecAPI.Resolvers;


namespace RecAPI.Organizations.Models
{
    public class Organization
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonRequired]
        public string Id { get; set; }
        [BsonRequired]
        // TODO: Make the Name unique!
        public string Name { get; set; }
        [BsonRequired]
        public string Description { get; set; }
        // Image
        public List<Section> Sections { get; }
        public List<AdmisionPeriode> AdmisionPeriodes { get; }
    }
}