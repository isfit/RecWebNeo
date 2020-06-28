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
    public class PositionQueries
    {
        public IEnumerable<Position> GetPositions(
            [Service]IPositionRepository repository
            ) =>
            repository.GetPositions();

        public Position GetPosition(
            SinglePositionInput input,
            [Service]IPositionRepository repository
            ){
                return repository.GetPosition(input.Id);
            }
    }
}
