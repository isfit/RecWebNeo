using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HotChocolate;
using MongoDB.Bson.Serialization.Attributes;

namespace RecAPI.Teams.InputType
{
    public class CreateTeamInput
    {
        [GraphQLNonNullType]
        public string Name { get; set;  }
        [GraphQLNonNullType]
        public string Description { get; set; }
        [BsonId]
        [GraphQLNonNullType]
        public string Section { get; set; }
    }
    public class UpdateTeamInput
    {
        [BsonId]
        [GraphQLNonNullType]
        public string Id { get; set; }
        public string Name { get; set;  }
        public string Description { get; set;  }
        [BsonId]
        //[GraphQLNonNullType]
        public string Section { get; set; }
    }
}