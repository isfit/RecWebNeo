using System.Collections.Generic;
using HotChocolate;
using MongoDB.Bson.Serialization.Attributes;

namespace RecAPI.Positions.InputType
{
    public class CreatePositionInput
    {
        [GraphQLNonNullType]
        public string Name { get; set; }
        [GraphQLNonNullType]
        public string Description { get; set; }
        [BsonId]
        [GraphQLNonNullType]
        public string AdmisionPeriode { get; set; }
        [BsonId]
        public string Section { get; set; }
        [BsonId]
        public string Team { get; set; }
        public List<string> Tags { get; set; }

    }

    public class UpdatePositionInput
    {
        [BsonId]
        [GraphQLNonNullType]
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        [BsonId]
        public string AdmisionPeriode { get; set; }
        [BsonId]
        public string Section { get; set; }
        [BsonId]
        public string Team { get; set; }
        public List<string> Tags { get; set; }

    }
}