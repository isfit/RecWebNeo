using HotChocolate;
using HotChocolate.Execution;
using RecAPI.Sections.Repositories;
using RecAPI.Organizations.Repositories;
namespace RecAPI.Users.ErrorHandling
{
    public class UserError
    {
        public static void UserExistError(string email)
        {
            throw new QueryException(ErrorBuilder.New().SetMessage("The user "+ email.ToString() +" does not exist!").Build());
        }

        public static void UserNotAvailableError(string email)
        {
            throw new QueryException(ErrorBuilder.New().SetMessage("The user "+ email.ToString() +" is not available at that time.").Build());
        }
    }
}