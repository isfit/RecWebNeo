using System.Collections.Generic;
using HotChocolate;
using MongoDB.Bson.Serialization.Attributes;

namespace RecAPI.Generic.InputType
{
    public class SingleModelInput
    {
        public SingleModelInput(
            string id
        )
        {
            Id = id;
        }
        [BsonId]
        [GraphQLNonNullType]
        public string Id { get; }
    }

    public class SingleModelNameInput
    {
        public SingleModelNameInput(
            string name
        )
        {
            Name = name;
        }
        [GraphQLNonNullType]
        public string Name { get; }
    }

    public class MultipeModelsInput
    {
        public MultipeModelsInput(
            List<string> ids
        )
        {
            Ids = ids;
        }
        public List<string> Ids { get; }
    }
}