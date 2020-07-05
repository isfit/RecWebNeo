using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HotChocolate;
using MongoDB.Bson.Serialization.Attributes;

namespace RecAPI.Sections.InputType
{
    public class CreateSectionInput
    {
        public CreateSectionInput(
            string name,
            string description
        )
        {
            Name = name;
            Description = description;
        }
        [GraphQLNonNullType]
        public string Name { get; }
        [GraphQLNonNullType]
        public string Description { get; }
    }
    public class UpdateSectionInput
    {
        public UpdateSectionInput(
            string id,
            string name,
            string description
        )
        {
            Id = id;
            Name = name;
            Description = description;
        }
        [BsonId]
        [GraphQLNonNullType]
        public string Id { get; }
        [GraphQLNonNullType]
        public string Name { get; }
        [GraphQLNonNullType]
        public string Description { get; }
    }
}