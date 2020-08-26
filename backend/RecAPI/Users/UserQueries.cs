using System;
using System.Collections.Generic;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Types.Relay;
using RecAPI.Users.Repositories;
using RecAPI.Users.Models;
using RecAPI.Generic.InputType;

using HotChocolate.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using RecAPI.Auth.Models;
using RecAPI.Users.Input;

namespace RecAPI.Users.Queries
{
    [ExtendObjectType(Name = "Query")]
    public class UserQueries
    {

        [Authorize(Policy = "administrator")]
        [UsePaging]
        [UseFiltering]
        [UseSorting]
        public IEnumerable<User> GetUsers(
            [Service]IUserRepository repository
        ) =>
        repository.GetUsers();

        [Authorize(Policy = "administrator")]
        public User GetUser(
            SingleModelInput input,
            [Service]IUserRepository repository
        )
        {
            return repository.GetUser(input.Id);
        }
        
        [Authorize]
        public User GetMe(
            [GlobalState("currentUser")] CurrentUser user,
            [Service]IUserRepository repository
        )
        {
            return repository.GetUserByAuth(user.UserId);
        }

        // Get available user at a given time
        // Get available user at a given time given teams and sections
        [Authorize(Policy = "administrator")]
        [UsePaging]
        [UseFiltering]
        [UseSorting]
        public List<User> GetAllAvailableUsers(
            SingleDateTimeInput input,
            [Service] IUserRepository userRepository
        )
        {
            // Check if user is also a internal or admin
            return userRepository.GetAllAvailableUsers(input.date);
        }

        // Reply to accept an interview ???
    }
}