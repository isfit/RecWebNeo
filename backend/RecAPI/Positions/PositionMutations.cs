using System;
using HotChocolate;
using HotChocolate.Types;
using RecAPI.Positions.Repositories;
using RecAPI.Positions.Models;
using RecAPI.Positions.InputType;
using RecAPI.Generic.InputType;
using RecAPI.Teams.Repositories;
using RecAPI.Sections.Repositories;
using RecAPI.Positions.ErrorHandeling;

namespace RecAPI.Positions.Mutations
{
    [ExtendObjectType(Name= "Mutation")]
    public class PositionMutations
    {

        public Position CreatePosition(
            CreatePositionInput input,
            [Service]IPositionRepository repository,
            [Service]ISectionRepository _section,
            [Service]ITeamRepository _team
        )
        {
            if(input.Section != null)
            {
                PositionError.SectionExists(_section, input.Section);
            }
            if (input.Team != null)
            {
                PositionError.TeamExists(_team, input.Team, input.Section);
            }
            var position = new Position()
            {
                Name = input.Name,
                Description = input.Description,
                AdmisionPeriode = input.AdmisionPeriode,
                Section = input.Section,
                Team = input.Team,
                Tags = input.Tags
            };
            return repository.AddPosition(position);
        }

        public Position UpdatePosition(
            UpdatePositionInput input,
            [Service]IPositionRepository repository,
            [Service]ISectionRepository _section,
            [Service]ITeamRepository _team
        )
        {
            // Error cheking
            var position = repository.GetPosition(input.Id);
            if(input.Section != null)
            {
                PositionError.SectionExists(_section, input.Section);
            }
            if(input.Team != null)
            {
                PositionError.TeamExists(_team, input.Team, input.Section ?? position.Section);
            }
            else if(input.Section != null)
            {
                PositionError.TeamExists(_team, position.Team, input.Section);
            }

           var updatePosition = new Position()
           {
               Id = input.Id,
               Name = input.Name ?? position.Name,
               Description = input.Description ?? position.Description,
               AdmisionPeriode = input.AdmisionPeriode ?? position.AdmisionPeriode,
               Section = input.Section ?? position.Section,
               Team = input.Team ?? position.Team,
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