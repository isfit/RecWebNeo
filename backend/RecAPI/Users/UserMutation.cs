using System;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using RecAPI.Auth.Repositories;
using RecAPI.Users.Input;
using RecAPI.Users.Models;
using RecAPI.Users.Repositories;

namespace RecAPI.Users.Mutations
{
    [ExtendObjectType(Name= "Mutation")]
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
                BirtDate = DateTime.Now
            };
            var storedUser = userRepository.CreateUser(user);
            if (storedUser != null)
            {
                return true;
            }
            return false;
        }
    }
}