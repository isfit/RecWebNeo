using HotChocolate;
using HotChocolate.Execution;
using RecAPI.Sections.Repositories;
using RecAPI.Organizations.Repositories;
namespace RecAPI.Sections.ErrorHandling
{
    public class SectionsError
    {
        public static void UniqueNameError(ISectionRepository repository, string name, string oldName)
        {
            var organizationNameExist = name?.ToLower() == oldName?.ToLower() ? false : repository.GetSectionByName(name) != null;
            if (organizationNameExist)
            {
                throw new QueryException(ErrorBuilder.New().SetMessage("Section name already exist!").Build());
            }
        }

        // TODO: Check if organization exists
        public static void OrganizationExists(IOrganizationRepository repository, string organizationId)
        {
            var organizationExist = repository.GetOrganization(organizationId) != null;
            if (!organizationExist){
                throw new QueryException(ErrorBuilder.New().SetMessage("The given section does not exist").Build());
            }
        }

        public static void SectionExistError(string sectionId)
        {
            throw new QueryException(ErrorBuilder.New().SetMessage("The given section " + sectionId.ToString() + " does not exist").Build());
        }
    } 
}