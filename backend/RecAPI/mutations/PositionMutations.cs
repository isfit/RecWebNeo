using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HotChocolate;
using HotChocolate.Types;
using RecAPI.Repositories;
using RecAPI.Models;
using RecAPI.InputType;

namespace RecAPI.Mutations
{
    [ExtendObjectType(Name= "Mutation")]
    public class PositionMutations
    {

        public Position CreatePosition(
            CreatePositionInput input,
            [Service]IPositionRepository repository
        )
        {
            var position = new Position(
                input.Name,
                input.Description,
                input.Section,
                input.Team,
                input.Tags
            );
            return repository.AddPosition(position);
        }

        public Position UpdatePosition(
            UpdatePositionInput input,
            [Service]IPositionRepository repository
        )
        {
           var position = repository.GetPosition(input.Id); 
           var updatePosition = new Position(
               input.Id,
               input.Name ?? position.Name,
               input.Description ?? position.Description,
               input.Section ?? position.Section,
               input.Team ?? position.Team,
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