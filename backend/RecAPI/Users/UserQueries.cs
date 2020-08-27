using System;
using System.Collections.Generic;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Types.Relay;
using RecAPI.Users.Repositories;
using RecAPI.Users.Models;
using RecAPI.Generic.InputType;
using RecAPI.Auth.Repositories;

using HotChocolate.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using RecAPI.Auth.Models;
using RecAPI.Users.Input;
using RecAPI.Applications.Repositories;

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
            [GlobalState("currentUser")] CurrentUser user,
            [Service]IAuthRepository authRepository,
            [Service]IUserRepository userRepository
        )
        {
            var currentUser = authRepository.GetAuthUser(user.UserId);
            if (currentUser.Roles.Contains("superuser"))
            {
                return userRepository.GetUsers();
            }
            return userRepository.GetApprovedUsers();
        }

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


        [Authorize(Policy = "superuser")]
        [UsePaging]
        [UseFiltering]
        [UseSorting]
        public IEnumerable<User> GetAllNotApprovedUsers(
            [Service] IUserRepository userRepository
            )
        {
            return userRepository.GetAllUsersNotApproved();
        }

        [Authorize(Policy = "administrator")]
        [UsePaging]
        [UseFiltering]
        [UseSorting]
        public IEnumerable<User> GetUserWithoutApplication(
            [Service] IUserRepository userRepository,
            [Service] IApplicationRepository applicationRepository
            )
        {
            List<string> applicationUsers = applicationRepository.GetApplicants();
            return userRepository.GetAllUsersExceptByAuth(applicationUsers);
        }
    }
}