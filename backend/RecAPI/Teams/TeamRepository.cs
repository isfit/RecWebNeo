using System;
using System.Linq;
using System.Collections.Generic;
using RecAPI.Teams.Models;
using RecAPI.Database;
using MongoDB.Driver;
using MongoDB.Bson;

namespace RecAPI.Teams.Repositories
{
    public class TeamRepository : ITeamRepository
    {
        private readonly IMongoCollection<Team> _teams;
        public TeamRepository(IRecWebDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _teams = database.GetCollection<Team>(settings.TeamCollectionName);
        }
        // Get all teams
        public IEnumerable<Team> GetTeams()
        {
            var data = _teams.Find(team => true).ToList();
            return data;
        }
        // Get teams given a section
        public IEnumerable<Team> GetTeams(string sectionId)
        {
            // TODO: Need sections
            return _teams.Find(team => team.Section == sectionId).ToList();
        }
        // Get temas gived a list of Ids
        public IEnumerable<Team> GetTeams(List<string> ids)
        {
            var data = _teams.Find(team => ids.Contains(team.Id)).ToList();
            return data;
        }
        // Get single team
        public Team GetTeam(string teamId)
        {
            var data = _teams.Find(team => team.Id == teamId).FirstOrDefault();
            return data;
        }
        // Add new team
        public Team AddTeam(Team team)
        {
            _teams.InsertOne(team);
            return GetTeam(team.Id);
        }
        // Update a team
        public Team UpdateTeam(string id, Team updateTeam)
        {
            _teams.ReplaceOne(team => team.Id == id, updateTeam);
            return GetTeam(id);
        }
        // Delete a team
        public bool DeleteTeam(string id)
        {
            var actionResult =_teams.DeleteOne(team => team.Id == id);
            return actionResult.IsAcknowledged && actionResult.DeletedCount > 0;
        }
    }
}