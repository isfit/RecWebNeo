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

namespace RecAPI.Users.Queries
{
    [ExtendObjectType(Name = "Query")]
    public class UserQueries
    {
        [Authorize]
        public IEnumerable<User> GetOrganizations(
            [Service]IUserRepository repository
        ) =>
        repository.GetUsers();
        [Authorize]
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
    }
}