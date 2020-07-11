using System;
using HotChocolate;
using HotChocolate.Types;
using RecAPI.Positions.Repositories;
using RecAPI.Positions.Models;
using RecAPI.Positions.InputType;
using RecAPI.Generic.InputType;
using RecAPI.Teams.Repositories;
using RecAPI.Teams.Models;

namespace RecAPI.Positions.Mutations
{
    [ExtendObjectType(Name= "Mutation")]
    public class PositionMutations
    {

        public Position CreatePosition(
            CreatePositionInput input,
            [Service]IPositionRepository repository,
            [Service]ITeamRepository _team
        )
        {
            string section;
            // Checks that the team is part of the section
            try {
                section = _team.GetTeam(input.Team)?.Section;
            } catch(FormatException err) {
                section = null;
            }
            var position = new Position()
            {
                Name = input.Name,
                Description = input.Description,
                Section = input.Section,
                Team = section == input.Section ? input.Team : null,
                Tags = input.Tags
            };
            return repository.AddPosition(position);
        }

        public Position UpdatePosition(
            UpdatePositionInput input,
            [Service]IPositionRepository repository,
            [Service]ITeamRepository _team
        )
        {
            string section;
            // Checks that the team is part of the section
            var position = repository.GetPosition(input.Id);
            try {
                string team = input.Team ?? position.Team;
                section = _team.GetTeam(team)?.Section;
            } catch(FormatException err) {
                section = null;
            }
           var updatePosition = new Position()
           {
               Id = input.Id,
               Name = input.Name ?? position.Name,
               Description = input.Description ?? position.Description,
               Section = input.Section ?? position.Section,
               Team = section == input.Section ? (input.Team ?? position.Team) : null,
               Tags = input.Tags ?? position.Tags
           };
           return repository.UpdatePosition(input.Id, updatePosition);
        }

        public bool DeletePosition(
            SingleModelInput input,
            [Service]IPositionRepository repository
        )
        {
            return repository.DeletePosition(input.Id);
        }

    }
}