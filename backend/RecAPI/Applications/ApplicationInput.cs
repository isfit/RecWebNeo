using System;
using System.Collections.Generic;
using HotChocolate;
using MongoDB.Bson.Serialization.Attributes;

namespace RecAPI.Applications.InputType
{
    public class CreateApplicationInput
    {
        [GraphQLNonNullType]
        public Dictionary<string, string> Positions { get; set; }
        [GraphQLNonNullType]
        public string AdmissionPeriode { get; set; }
        [GraphQLNonNullType]
        public bool Prioritized { get; set; }
        [GraphQLNonNullType]
        public string ApplicationText { get; set;}
        [GraphQLNonNullType]
        public List<DateTime> Available { get; set; }
        [GraphQLNonNullType]
        public bool PreferDigital { get; set; }
        [GraphQLNonNullType]
        public string Interest { get; set; }
    }

    public class UpdateApplicationInput
    {
        public Dictionary<string, string> Positions { get; set; }
        public bool? Prioritized { get; set; }
        public string ApplicationText { get; set;}
        public List<DateTime> Available { get; set; }
        public bool? PreferDigital { get; set; }
        public string Interest { get; set; }
    }

    public class ApplicationBusyTimesInput
    {
        [BsonId]
        public string Application { get; set; }
        public List<string> InterviewerEmail { get; set; }
    }
}