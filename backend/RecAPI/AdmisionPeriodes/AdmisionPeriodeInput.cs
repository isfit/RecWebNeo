using System;
using System.Collections.Generic;
using HotChocolate;
using MongoDB.Bson.Serialization.Attributes;

namespace RecAPI.AdmisionPeriodes.InputType
{
    public class CreateAdmisionPeriodeInput
    {
        [GraphQLNonNullType]
        public string Organization { get; set; }
        [GraphQLNonNullType]
        public DateTime StartDate { get; set; }
        [GraphQLNonNullType]
        public DateTime EndDate { get; set; }
        [GraphQLNonNullType]
        public DateTime StartInterviewDate { get; set; }
        [GraphQLNonNullType]
        public DateTime EndInterviewDate { get; set; }
        [GraphQLNonNullType]
        public int MinAppliedPositions { get; set; }
        [GraphQLNonNullType]
        public int MaxAppliedPositions { get; set; }
    }
    public class UpdateAdmisionPeriodesInput
    {
        [GraphQLNonNullType]
        public string Id { get; set; }
        public string Organization { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime StartInterviewDate { get; set; }
        public DateTime EndInterviewDate { get; set; }
        public int MinAppliedPositions { get; set; }
        public int MaxAppliedPositions { get; set; }
    }
}