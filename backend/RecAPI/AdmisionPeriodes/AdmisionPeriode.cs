using System;
using System.Collections.Generic;
using RecAPI.Sections.Models;
using RecAPI.Organizations.Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using RecAPI.Resolvers;

namespace RecAPI.AdmisionPeriodes.Models
{
    public class AdmisionPeriode : IOrganizationConnection
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonRequired]
        public string Id { get; set; }

        [BsonRequired]
        [OrganizationResolver]
        public string Organization { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }


        public DateTime StartInterviewDate { get; set; }

        public DateTime EndInterviewDate { get; set; }


        public int MinAppliedPositions { get; set; }

        public int MaxAppliedPositions { get; set; }


        [PositionResolverAdmisionPeriode]
        public List<Section> Positions { get; }
    }
    public interface IAdmisionPeriodeConnection
    {
        string AdmisionPeriode { get; set; }
    }
}