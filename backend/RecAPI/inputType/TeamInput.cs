using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HotChocolate;
using MongoDB.Bson.Serialization.Attributes;

namespace RecAPI.InputType
{
    public class CreateTeamInput
    {
        public CreateTeamInput(
            string name,
            string description,
            string section
        )
        {
            Name = name;
            Description = description;
            Section = section;
        }
        [GraphQLNonNullType]
        public string Name { get; }
        [GraphQLNonNullType]
        public string Description { get; }
        [BsonId]
        //[GraphQLNonNullType]
        public string Section { get; }
    }
    public class UpdateTeamInput
    {
        public UpdateTeamInput(
            string id,
            string name,
            string description,
            string section
        )
        {
            Id = id;
            Name = name;
            Description = description;
            Section = section;
        }
        [BsonId]
        [GraphQLNonNullType]
        public string Id { get; }
        public string Name { get; }
        public string Description { get; }
        [BsonId]
        //[GraphQLNonNullType]
        public string Section { get; }
    }
}