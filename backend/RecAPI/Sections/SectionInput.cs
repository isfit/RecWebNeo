using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HotChocolate;
using MongoDB.Bson.Serialization.Attributes;

namespace RecAPI.Sections.InputType
{
    public class CreateSectionInput
    {
        [GraphQLNonNullType]
        public string Name { get; set; }
        [GraphQLNonNullType]
        public string Description { get; set; }
        [GraphQLNonNullType]
        public string Organization { get; set; }
    }
    public class UpdateSectionInput
    {
        [BsonId]
        [GraphQLNonNullType]
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Organization { get; set; }
    }
}