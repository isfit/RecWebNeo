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
            List<string> tags
        )
        {
            Name = name;
            Description = description;
            Tags = tags;
        }
        [GraphQLNonNullType]
        public string Name { get; }
        [GraphQLNonNullType]
        public string Description { get; }
        public List<string> Tags { get; }

    }

    public class UpdatePositionInput
    {
        public UpdatePositionInput(
            string id,
            string name,
            string description,
            List<string> tags
        )
        {
            Id = id;
            Name = name;
            Description = description;
            Tags = tags;
        }
        [BsonId]
        [GraphQLNonNullType]
        public string Id { get; }

        [GraphQLNonNullType]
        public string Name { get; }
        [GraphQLNonNullType]
        public string Description { get; }
        public List<string> Tags { get; }

    }

    public class SinglePositionInput
    {
        public SinglePositionInput(
            string id
        )
        {
            Id = id;
        }
        [BsonId]
        [GraphQLNonNullType]
        public string Id { get; }
    }
}