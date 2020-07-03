using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HotChocolate;
using MongoDB.Bson.Serialization.Attributes;

namespace RecAPI.InputType
{
    public class CreatePositionInput
    {
        public CreatePositionInput(
            string name,
            string description,
            string section,
            string team,
            List<string> tags
        )
        {
            Name = name;
            Description = description;
            Section = section;
            Team = team;
            Tags = tags;
        }
        [GraphQLNonNullType]
        public string Name { get; }
        [GraphQLNonNullType]
        public string Description { get; }
        [BsonId]
        public string Section { get; }
        [BsonId]
        public string Team { get; }
        public List<string> Tags { get; }

    }

    public class UpdatePositionInput
    {
        public UpdatePositionInput(
            string id,
            string name,
            string description,
            string section,
            string team,
            List<string> tags
        )
        {
            Id = id;
            Name = name;
            Description = description;
            Section = section;
            Team = team;
            Tags = tags;
        }
        [BsonId]
        [GraphQLNonNullType]
        public string Id { get; }

        [GraphQLNonNullType]
        public string Name { get; }
        [GraphQLNonNullType]
        public string Description { get; }
        [BsonId]
        public string Section { get; }
        [BsonId]
        public string Team { get; }
        public List<string> Tags { get; }

    }
}