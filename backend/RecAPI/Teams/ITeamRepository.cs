using System.Collections.Generic;
using RecAPI.Teams.Models;

namespace RecAPI.Teams.Repositories
{
    public interface ITeamRepository
    {
        IEnumerable<Team> GetTeams();
        IEnumerable<Team> GetTeams(string sectionId);
        IEnumerable<Team> GetTeams(List<string> ids);
        Team GetTeam(string teamId);
        Team GetTeamByName(string teamName);
        Team AddTeam(Team team);
        Team UpdateTeam(string id, Team team);
        bool DeleteTeam(string id);
    }
}