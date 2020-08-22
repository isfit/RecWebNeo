using RecAPI.Auth.Models;

namespace RecAPI.Auth.Repositories
{
    public interface IAuthRepository
    {
        string RegisterUser(AuthUser authUser);
        AuthUser GetAuthUserByEmail(string email);
        AuthUser GetAuthUser(string userId);
        bool SetRoleOfUser(string currentUser, string email, string role);
        string GetUserEmail(string id);
        bool DeleteUser(string id);
    }
}