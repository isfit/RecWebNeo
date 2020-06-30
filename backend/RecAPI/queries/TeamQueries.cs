using System;
using System.Collections.Generic;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Types.Relay;
using RecAPI.Repositories;
using RecAPI.Models;
using RecAPI.InputType;
namespace RecAPI.Queries
{
    [ExtendObjectType(Name = "Query")]
    public class TeamQueries
    {
        public IEnumerable<Team> GetTeams(
            [Service]ITeamRepository repository
        ) =>
        repository.GetTeams();

        public Team GetTeam(
            SingleModelInput input,
            [Service]ITeamRepository repository
        ) =>
        repository.GetTeam(input.Id);
    }
}