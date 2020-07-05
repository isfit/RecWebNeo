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
            var position = new Position(
                input.Name,
                input.Description,
                input.Section,
                section == input.Section ? input.Team : null,
                input.Tags
            );
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
           var updatePosition = new Position(
               input.Id,
               input.Name ?? position.Name,
               input.Description ?? position.Description,
               input.Section ?? position.Section,
               section == input.Section ? (input.Team ?? position.Team) : null,
               input.Tags ?? position.Tags
           );
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