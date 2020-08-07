using System.Collections.Generic;
using HotChocolate;
using MongoDB.Bson.Serialization.Attributes;

namespace RecAPI.Users.Input
{
    public class RegisterUserInput
    {
        // Authentication values
        [GraphQLNonNullType]
        public string Email { get; set; }
        [GraphQLNonNullType]
        public string Password { get; set; }

        [GraphQLNonNullType]
        public string FirstName { get; set; }
        [GraphQLNonNullType]
        public string LastName { get; set; }
        //[GraphQLNonNullType]
        //public DateTime BirtDate { get; set; }
    }    
}