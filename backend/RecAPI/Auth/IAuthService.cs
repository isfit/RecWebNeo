using HotChocolate;
using RecAPI.Auth.Models;
using System.Threading.Tasks;

namespace RecAPI.Auth.Repositories
{
    public interface IAuthService
    {
        string Authenticate(string email, string password, IAuthRepository authRepository);
        string RegisterUser(string email, string password, IAuthRepository authRepository);
        bool EditPassword(string email, string newPassword, [Service] IAuthRepository authRepository);
        bool EditPassword(string id, string oldPassword, string newPassword, IAuthRepository authRepository);
    }
}