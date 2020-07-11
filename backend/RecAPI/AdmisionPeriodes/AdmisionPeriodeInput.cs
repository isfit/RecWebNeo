using System;
using System.Collections.Generic;
using HotChocolate;
using MongoDB.Bson.Serialization.Attributes;

namespace RecAPI.AdmisionPeriodes.InputType
{
    public class CreateAdmisionPeriodeInput
    {
        public CreateAdmisionPeriodeInput(
            string organization,
            DateTime startDate,
            DateTime endDate,
            List<string> sections
        )
        {
            Organization = organization;
            StartDate = startDate;
            EndDate = endDate;
            Sections = sections;
        }
        [BsonId]
        [GraphQLNonNullType]
        public string Id { get; }
        [GraphQLNonNullType]
        public string Organization { get; }
        [GraphQLNonNullType]
        public DateTime StartDate { get; }
        [GraphQLNonNullType]
        public DateTime EndDate { get; }
        public List<string> Sections { get; }

    }
    public class UpdateAdmisionPeriodesInput
    {
        public UpdateAdmisionPeriodesInput(
            string id,
            string organization,
            DateTime startDate,
            DateTime endDate,
            List<string> sections
        )
        {
            Id = id;
            Organization = organization;
            StartDate = startDate;
            EndDate = endDate;
            Sections = sections;
        }
        [BsonId]
        [GraphQLNonNullType]
        public string Id { get; }
        [GraphQLNonNullType]
        public string Organization { get; }
        public DateTime StartDate { get; }
        public DateTime EndDate { get; }
        public List<string> Sections { get; }
    }
}