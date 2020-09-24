using System.Collections.Generic;
using HotChocolate;
using MongoDB.Bson.Serialization.Attributes;

namespace RecAPI.Organizations.InputType
{
    public class CreateOrganizationInput
    {
        [GraphQLNonNullType]
        public string Name { get; set; }
        [GraphQLNonNullType]
        public string Description { get; set; }
    }

    public class UpdateOrganizationInput
    {
        [BsonId]
        [GraphQLNonNullType]
        public string Id { get; set; }
        [GraphQLNonNullType]
        public string Name { get; set; }
        [GraphQLNonNullType]
        public string Description { get; set; }
    }
}