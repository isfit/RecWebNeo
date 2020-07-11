using System;
using System.Collections.Generic;
using RecAPI.Sections.Models;
using RecAPI.Organizations.Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using RecAPI.Resolvers;

namespace RecAPI.AdmisionPeriodes.Model
{
    public class AdmisionPeriode
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonRequired]
        public string Id { get; set; }
        [BsonRequired]
        public Organization Organization { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public List<Section> Sections { get; }
    }
}