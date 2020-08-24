using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
        [Phone]
        public string PhoneNumber { get; set; }

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
        [Phone]
        public string PhoneNumber { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? BirtDate { get; set; }

        [Authorize(Policy = "internal")]
        public List<DateTime> BusyTime { get; set; }
        [Authorize(Policy = "internal")]
        public List<string> Sections { get; set; }
        [Authorize(Policy = "internal")]
        public List<string> Teams { get; set; }
    }

    public class UserUpdatePasswordInput
    {
        public string oldPassword { get; set; }
        public string newPassword { get; set; }
    }

    public class SingleDateTimeInput
    {
        [GraphQLNonNullType]
        public DateTime date { get; set; }
    }
}