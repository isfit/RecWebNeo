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
            string description,
            string organization
        )
        {
            Name = name;
            Description = description;
            Organization = organization;
        }
        [GraphQLNonNullType]
        public string Name { get; }
        [GraphQLNonNullType]
        public string Description { get; }
        [GraphQLNonNullType]
        public string Organization { get; }
    }
    public class UpdateSectionInput
    {
        public UpdateSectionInput(
            string id,
            string name,
            string description,
            string organization
        )
        {
            Id = id;
            Name = name;
            Description = description;
            Organization = organization;
        }
        [BsonId]
        [GraphQLNonNullType]
        public string Id { get; }
        public string Name { get; }
        public string Description { get; }
        public string Organization { get; }
    }
}