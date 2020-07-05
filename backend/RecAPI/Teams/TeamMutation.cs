using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HotChocolate;
using HotChocolate.Types;
using RecAPI.Teams.Repositories;
using RecAPI.Teams.Models;
using RecAPI.Teams.InputType;
using RecAPI.Generic.InputType;

namespace RecAPI.Teams.Mutations
{
    [ExtendObjectType(Name= "Mutation")]
    public class TeamMutations
    {
        public Team CreateTeam(
            CreateTeamInput input,
            [Service]ITeamRepository repository
        )
        {
            var team = new Team(
                input.Name,
                input.Description,
                input.Section
            );
            return repository.AddTeam(team);
        }

        public Team UpdateTeam(
            UpdateTeamInput input,
            [Service]ITeamRepository repository
        )
        {
            var team = repository.GetTeam(input.Id);
            team.Name = input.Name ?? team.Name;
            team.Description = input.Description ?? team.Description;
            team.Section = input.Section ?? team.Section;
            return repository.UpdateTeam(input.Id ,team);
        }

        public bool DeleteTeam(
            SingleModelInput input,
            [Service]ITeamRepository repository
        )
        {
            return repository.DeleteTeam(input.Id);
        }
    }
}