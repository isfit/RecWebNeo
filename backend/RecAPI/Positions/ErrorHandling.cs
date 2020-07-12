using HotChocolate;
using HotChocolate.Execution;
using RecAPI.Positions.Repositories;
using RecAPI.Teams.Repositories;
using RecAPI.Sections.Repositories;
using RecAPI.AdmisionPeriodes.Repositories;
namespace RecAPI.Positions.ErrorHandling
{
    public class PositionError
    {
        // Not nessesary?
        public static void UniqueNameError(IPositionRepository repository, string name, string oldName)
        {
            var organizationNameExist = name?.ToLower() == oldName?.ToLower() ? false : repository.GetPositionByName(name) != null;
            if (organizationNameExist)
            {
                throw new QueryException(ErrorBuilder.New().SetMessage("Position name already exist!").Build());
            }
        }

        // TODO: Check if section exists
        public static void SectionExists(ISectionRepository repository, string sectionId)
        {
            var sectionExist = repository.GetSection(sectionId) != null;
            if (!sectionExist){
                throw new QueryException(ErrorBuilder.New().SetMessage("The given section does not exist").Build());
            }
        }

        public static void AdmisionPeriodeExists(IAdmisionPeriodeRepository repository, string admisionPeriodeId)
        {
            var admisionPeriodeExists = repository.GetAdmisionPeriode(admisionPeriodeId) != null;
            if (!admisionPeriodeExists){
                throw new QueryException(ErrorBuilder.New().SetMessage("The given admision periode does not exist").Build());
            }
        }

        public static void TeamExists(ITeamRepository _team, string teamId, string sectionId)
        {
            var team = _team.GetTeam(teamId);
            if (team == null)
            {
                throw new QueryException(ErrorBuilder.New().SetMessage("The given team does not exist").Build());
            }
            if (team.Section != sectionId)
            {
                throw new QueryException(ErrorBuilder.New().SetMessage("The given team does not exist as a team in the given section").Build());
            }

        }
    } 
}