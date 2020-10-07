using HotChocolate;
using HotChocolate.Execution;
using RecAPI.Sections.Repositories;
using RecAPI.Organizations.Repositories;
using Microsoft.AspNetCore.Http;

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

        public static void NoUsersExist()
        {
            throw new QueryException(ErrorBuilder.New().SetMessage("The database corrently does not contain any users").Build());
        }

        public static void UserNotAssignedTeam()
        {
            throw new QueryException(ErrorBuilder.New().SetMessage("The user is not assigned a team. When team leader, you must be assigned a team.").Build());
        }

        public static void ListedSectionsError()
        {
            throw new QueryException(ErrorBuilder.New().SetMessage("No sections were listed.").Build());
        }
        public static void ListedTeamsError()
        {
            throw new QueryException(ErrorBuilder.New().SetMessage("No sections were listed.").Build());
        }
    }
}