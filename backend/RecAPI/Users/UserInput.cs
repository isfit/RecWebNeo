using System;
using System.Collections.Generic;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
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
        [GraphQLNonNullType]
        public DateTime BirtDate { get; set; }
    }  
    
    public class UpdateUserInput
    {
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? BirtDate { get; set; }

        [Authorize(Policy = "internal")]
        public List<string> BusyTime { get; set; }
        [Authorize(Policy = "internal")]
        public List<string> Sections { get; set; }
        [Authorize(Policy = "internal")]
        public List<string> Teams { get; set; }
    }
}