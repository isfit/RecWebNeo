using System;
using HotChocolate;
using HotChocolate.Execution;
using RecAPI.Organizations.Repositories;
namespace RecAPI.AdmisionPeriodes.ErrorHandeling
{
    public class AdmisionPeriodeError
    {
        public static void ValidDates(DateTime startDate, DateTime endDate)
        {
            if(startDate > endDate)
            {
                throw new QueryException(ErrorBuilder.New().SetMessage("End date must come after start data").Build());
            }
        }
        public static void OrganizationExists(IOrganizationRepository repository, string organizationId)
        {
            var organizationExist = repository.GetOrganization(organizationId) != null;
            if (!organizationExist){
                throw new QueryException(ErrorBuilder.New().SetMessage("The given organization does not exist").Build());
            }
        }
    }
}