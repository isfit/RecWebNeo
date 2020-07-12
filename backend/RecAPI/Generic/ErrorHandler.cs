using HotChocolate;
using HotChocolate.Execution;
namespace RecAPI.Generic
{
    public class GenericErrorHendler
    {
        public static void StringValueExists(string value, string typeError)
        {
            if (value == null)
            {
                throw new QueryException(ErrorBuilder.New().SetMessage($"The {typeError} field is required").Build());
            }
        }
    }
}