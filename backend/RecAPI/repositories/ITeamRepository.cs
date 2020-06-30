using System.Collections.Generic;
using RecAPI.Models;

namespace RecAPI.Repositories
{
    public interface ITeamRepository
    {
        IEnumerable<Team> GetTeams();
        IEnumerable<Team> GetTeams(string sectionId);
        IEnumerable<Team> GetTeams(List<string> ids);
        Team GetTeam(string teamId);
        Team AddTeam(Team team);
        Team UpdateTeam(string id, Team team);
        bool DeleteTeam(string id);
    }
}