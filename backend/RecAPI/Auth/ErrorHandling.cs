using HotChocolate;
using HotChocolate.Execution;
using RecAPI.Auth.Repositories;

namespace RecAPI.Auth.ErrorHandling
{
    public class AuthError
    {
        public static void UniqueEmailError(IAuthRepository repository, string email, string oldEmail)
        {
            var organizationNameExist = email?.ToLower() == oldEmail?.ToLower() ? false : repository.GetAuthUserByEmail(email) != null;
            if (organizationNameExist)
            {
                throw new QueryException(ErrorBuilder.New().SetMessage("The Email is already registered to another user").Build());
            }
        }

        public static void CredentialsError()
        {
            throw new QueryException(ErrorBuilder.New().SetMessage("The email or password is invalid").Build());
        }

        public static void UserExistanceError()
        {
            throw new QueryException(ErrorBuilder.New().SetMessage("The user does not exist").Build());
        }

        public static void AuthorizationError()
        {
            throw new QueryException(ErrorBuilder.New().SetMessage("The user is not authorized to use this resource.").Build());
        } 
    } 
}