using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HotChocolate;
using HotChocolate.Types;
using RecAPI.Teams.Repositories;
using RecAPI.Sections.Repositories;
using RecAPI.Teams.Models;
using RecAPI.Teams.InputType;
using RecAPI.Generic.InputType;
using RecAPI.Teams.ErrorHandling;
using RecAPI.Generic;
using HotChocolate.AspNetCore.Authorization;

namespace RecAPI.Teams.Mutations
{
    [ExtendObjectType(Name= "Mutation")]
    [Authorize(Policy = "administrator")]
    public class TeamMutations
    {
        public Team CreateTeam(
            CreateTeamInput input,
            [Service]ITeamRepository repository,
            [Service]ISectionRepository _section
        )
        {
            TeamError.UniqueNameError(repository, input.Name, null);
            TeamError.SectionExists(_section, input.Section);
            var team = new Team()
            {
                Name = input.Name,
                Description = input.Description,
                Section = input.Section
            };
            return repository.AddTeam(team);
        }

        public Team UpdateTeam(
            UpdateTeamInput input,
            [Service]ITeamRepository repository,
            [Service]ISectionRepository _section
        )
        {
            var team = repository.GetTeam(input.Id);
            TeamError.UniqueNameError(repository, team.Name, input.Name);
            if (input.Section != null)
            {
                TeamError.SectionExists(_section, input.Section);
            }
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