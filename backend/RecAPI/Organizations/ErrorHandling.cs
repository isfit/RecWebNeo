
using HotChocolate;
using HotChocolate.Execution;
using RecAPI.Organizations.Repositories;

namespace RecAPI.Organizations.ErrorHandeling
{
    public class OrganizationError
    {
        public static void UniqueNameError(IOrganizationRepository repository, string name, string oldName)
        {
            var organizationNameExist = name?.ToLower() == oldName?.ToLower() ? false : repository.GetOrganizationByName(name) != null;
            if (organizationNameExist)
            {
                throw new QueryException(ErrorBuilder.New().SetMessage("Organization name already exist!").Build());
            }
        }
    } 
}