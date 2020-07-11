using System.Collections.Generic;
using HotChocolate;
using MongoDB.Bson.Serialization.Attributes;

namespace RecApi.Organizations.InputType
{
    public class CreateOrganizationInput
    {
        public CreateOrganizationInput(
            string name,
            string description,
            List<string> sections,
            List<string> admisionPeriodes
        )   
        {
            Name = name;
            Description = description;
            Sections = sections;
            AdmisionPeriodes = admisionPeriodes;
        }
        [GraphQLNonNullType]
        public string Name { get; }
        [GraphQLNonNullType]
        public string Description { get; }
        [BsonId]
        public List<string> Sections { get; }
        [BsonId]
        public List<string> AdmisionPeriodes { get; }
    }

    public class UpdateOrganizationInput
    {
        public UpdateOrganizationInput(
            string id,
            string name,
            string description,
            List<string> sections,
            List<string> admisionPeriodes
        )   
        {
            Id = id;
            Name = name;
            Description = description;
            Sections = sections;
            AdmisionPeriodes = admisionPeriodes;
        }
        [BsonId]
        public string Id { get; }
        [GraphQLNonNullType]
        public string Name { get; }
        [GraphQLNonNullType]
        public string Description { get; }
        [BsonId]
        public List<string> Sections { get; }
        [BsonId]
        public List<string> AdmisionPeriodes { get; }
    }
}