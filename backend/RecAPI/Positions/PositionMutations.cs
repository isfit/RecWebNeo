using System;
using HotChocolate;
using HotChocolate.Types;
using RecAPI.Positions.Repositories;
using RecAPI.Positions.Models;
using RecAPI.Positions.InputType;
using RecAPI.Generic.InputType;
using RecAPI.Teams.Repositories;
using RecAPI.Sections.Repositories;
using RecAPI.AdmisionPeriodes.Repositories;
using RecAPI.Positions.ErrorHandling;
using HotChocolate.AspNetCore.Authorization;
using System.Collections.Generic;
using System.Linq;
using RecAPI.Users.Repositories;

namespace RecAPI.Positions.Mutations
{
    [ExtendObjectType(Name= "Mutation")]
    public class PositionMutations
    {
        [Authorize(Policy = "administrator")]
        public Position CreatePosition(
            CreatePositionInput input,
            [Service]IAdmisionPeriodeRepository _admisionPeriode,
            [Service]IPositionRepository repository,
            [Service]ISectionRepository _section,
            [Service]ITeamRepository _team
        )
        {
            PositionError.AdmisionPeriodeExists(_admisionPeriode, input.AdmisionPeriode);
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
                Tags = input.Tags,
                Contact = input.Contact
            };
            return repository.AddPosition(position);
        }

        [Authorize(Policy = "administrator")]
        public Position UpdatePosition(
            UpdatePositionInput input,
            [Service]IAdmisionPeriodeRepository _admisionPeriode,
            [Service]IPositionRepository repository,
            [Service]ISectionRepository _section,
            [Service]ITeamRepository _team
        )
        {
            // Error cheking
            var position = repository.GetPosition(input.Id);
            if (input.AdmisionPeriode != null)
            {
                PositionError.AdmisionPeriodeExists(_admisionPeriode, input.AdmisionPeriode);
            }
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
               Tags = input.Tags ?? position.Tags,
               Contact = input.Contact ?? position.Contact
           };
           return repository.UpdatePosition(input.Id, updatePosition);
        }

        [Authorize(Policy = "administrator")]
        public bool DeletePosition(
            SingleModelInput input,
            [Service]IPositionRepository repository
        )
        {
            return repository.DeletePosition(input.Id);
        }

        [Authorize(Policy = "administrator")]
        public Position AddPreferedInterviewers(
            [GraphQLNonNullType] string positionId,
            [GraphQLNonNullType] List<string> interviewers,
            [Service] IPositionRepository repository,
            [Service] IUserRepository userRepo
        )
        {
            var possition = repository.GetPosition(positionId);
            if (possition == null)
            {
                PositionError.PossitionExistError();
            };
            var preffered = possition.PrefferedInterviewers ?? new List<string>();
            var newPreffered = interviewers.Where(x => !preffered.Contains(x)).ToList();
            foreach (var userEmail in newPreffered)
            {
                var user = userRepo.GetUserByEmail(userEmail);
                if (user != null)
                {
                    preffered.Add(userEmail);
                };
            }
            possition.PrefferedInterviewers = preffered;
            return repository.UpdatePosition(possition.Id, possition);
        }

        [Authorize(Policy = "administrator")]
        public Position RemovePreferedInterviewers(
            [GraphQLNonNullType] string positionId,
            [GraphQLNonNullType] List<string> interviewers,
            [Service] IPositionRepository repository,
            [Service] IUserRepository userRepo
        )
        {
            var possition = repository.GetPosition(positionId);
            if (possition == null)
            {
                PositionError.PossitionExistError();
            };
            var preffered = possition.PrefferedInterviewers?.Where(x => !interviewers.Contains(x)).ToList() ?? new List<string>();
            possition.PrefferedInterviewers = preffered;
            return repository.UpdatePosition(possition.Id, possition);
        }

    }
}