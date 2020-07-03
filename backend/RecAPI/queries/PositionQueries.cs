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
        [UsePaging]
        //[UseFiltering]
        //[UseSorting]
        public IEnumerable<Position> GetPositions(
            [Service]IPositionRepository repository
            ) =>
            repository.GetPositions();

        public Position GetPosition(
            SingleModelInput input,
            [Service]IPositionRepository repository
            )
            {
                return repository.GetPosition(input.Id);
            }
    }
}
