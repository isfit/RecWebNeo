using HotChocolate;
using HotChocolate.Execution;
using RecAPI.Teams.Repositories;
using RecAPI.Sections.Repositories;
namespace RecAPI.Teams.ErrorHandling
{
    public class TeamError
    {
        public static void UniqueNameError(ITeamRepository repository, string name, string oldName)
        {
            var organizationNameExist = name?.ToLower() == oldName?.ToLower() ? false : repository.GetTeamByName(name) != null;
            if (organizationNameExist)
            {
                throw new QueryException(ErrorBuilder.New().SetMessage("Team name already exist!").Build());
            }
        }

        // TODO: Check if organization exists
        public static void SectionExists(ISectionRepository repository, string sectionId)
        {
            var sectionExist = repository.GetSection(sectionId) != null;
            if (!sectionExist){
                throw new QueryException(ErrorBuilder.New().SetMessage("The given section does not exist").Build());
            }
        }

        public static void TeamExistError(string teamId)
        {
            throw new QueryException(ErrorBuilder.New().SetMessage("The given team " + teamId.ToString() + " does not exist").Build());
        }
    } 
}