using System.Collections.Generic;
using HotChocolate;
using MongoDB.Bson.Serialization.Attributes;

namespace RecAPI.Application.InputType
{
    public class CreateApplicationInput
    {
        [GraphQLNonNullType]
        public Dictionary<int, string> Positions { get; set; }
        [GraphQLNonNullType]
        public bool Prioritized { get; set; }
        [GraphQLNonNullType]
        public string ApplicationText { get; set;}
        [GraphQLNonNullType]
        public List<DateTime> Available { get; set; }
        [GraphQLNonNullType]
        public bool PreferDigital { get; set; }
    }

    public class UpdateApplicationInput
    {
        public Dictionary<int, string> Positions { get; set; }
        public bool Prioritized { get; set; }
        public string ApplicationText { get; set;}
        public List<DateTime> Available { get; set; }
        public bool PreferDigital { get; set; }
    }
}