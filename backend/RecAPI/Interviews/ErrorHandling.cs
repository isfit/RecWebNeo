using HotChocolate;
using HotChocolate.Execution;
using RecAPI.Sections.Repositories;
using RecAPI.Organizations.Repositories;

namespace RecAPI.Interviews
{
    public class InterviewError
    {
        public static void InterviewAlreadyExistsError()
        {
            throw new QueryException(ErrorBuilder.New().SetMessage("The interview already exists.").Build());
        }

        public static void InterviewDoesNotExistsError()
        {
            throw new QueryException(ErrorBuilder.New().SetMessage("The interview does not exist.").Build());
        }

        public static void InterviewTimeNotAllowed()
        {
            throw new QueryException(ErrorBuilder.New().SetMessage("The interview does not exist.").Build());
        }
    }
}
