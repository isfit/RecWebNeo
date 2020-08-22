using System;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
using RecAPI.Auth.Models;
using RecAPI.Auth.Repositories;
using RecAPI.Users.Input;
using RecAPI.Users.Models;
using RecAPI.Users.Repositories;

namespace RecAPI.Users.Mutations
{
    [ExtendObjectType(Name = "Mutation")]
    public class UserMutation
    {
        public string Login(
            string email,
            string password,
            [Service] IAuthService authService,
            [Service] IAuthRepository authRepository
        )
        {
            return authService.Authenticate(email, password, authRepository);
        }

        public bool RegisterUser(
            RegisterUserInput registerUser,
            [Service] IAuthService authService,
            [Service] IAuthRepository authRepository,
            [Service] IUserRepository userRepository
        )
        {
            var authUserId = authService.RegisterUser(registerUser.Email, registerUser.Password, authRepository);
            registerUser.Password = null;
            var user = new User()
            {
                AuthId = authUserId,
                Email = registerUser.Email,
                FirstName = registerUser.FirstName,
                LastName = registerUser.LastName,
                BirtDate = registerUser.BirtDate
            };
            var storedUser = userRepository.CreateUser(user);
            if (storedUser != null)
            {
                return true;
            }
            return false;
        }


        [Authorize]
        public User EditUserInformation(
            [GlobalState("currentUser")] CurrentUser user,
            UpdateUserInput input,
            [Service] IUserRepository userRepository,
            [Service] IAuthRepository authRepository
        )
        {
            var userEmail = authRepository.GetUserEmail(user.UserId);
            var prevUser = userRepository.GetUserByEmail(userEmail);
            User updatedUser = new User()
            {
                FirstName = input.FirstName ?? prevUser.FirstName,
                LastName = input.LastName ?? prevUser.LastName,
                BirtDate = input.BirtDate ?? prevUser.BirtDate,
                BusyTime = input.BusyTime ?? prevUser.BusyTime
            };
            return userRepository.UpdateUser(prevUser.Id, updatedUser);
        }

        [Authorize]
        public bool DeleteUser(
            [GlobalState("currentUser")] CurrentUser user,
            [Service] IUserRepository userRepository
        )
        {
            // TODO + Error handling
            return false;
        }

        [Authorize(Policy = "administrator")]
        public bool SetRole(
            string email,
            string role,
            [Service] IAuthRepository authRepository
        )
        {
            return authRepository.SetRoleOfUser(email, role);
        }

    }
}