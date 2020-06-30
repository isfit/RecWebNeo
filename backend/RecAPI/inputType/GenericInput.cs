using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HotChocolate;
using MongoDB.Bson.Serialization.Attributes;

namespace RecAPI.InputType
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