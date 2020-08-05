using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using RecAPI.Auth.Repositories;
using RecAPI.Auth.Input;
using RecAPI.Auth.Models;

namespace RecAPI.Auth.Mutations
{
    [ExtendObjectType(Name= "Mutation")]
    public class AuthMutation
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
            [Service] IAuthRepository authRepository
        )
        {
            return authService.RegisterUser(registerUser.Email, registerUser.Password, authRepository);
        }
    }

}