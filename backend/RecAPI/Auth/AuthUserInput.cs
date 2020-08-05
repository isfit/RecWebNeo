using System.Collections.Generic;
using HotChocolate;
using MongoDB.Bson.Serialization.Attributes;

namespace RecAPI.Auth.Input
{
    public class RegisterUserInput
    {
        public RegisterUserInput(
            string email,
            string password
        )   
        {
            Email = email;
            Password = password;
        }
        [GraphQLNonNullType]
        public string Email { get; }
        [GraphQLNonNullType]
        public string Password { get; }
    }    
}