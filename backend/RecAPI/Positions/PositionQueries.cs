using System;
using System.Collections.Generic;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Types.Relay;
using RecAPI.Positions.Repositories;
using RecAPI.Positions.Models;
using RecAPI.Generic.InputType;
using HotChocolate.AspNetCore.Authorization;

namespace RecAPI.Positions.Queries
{
    [ExtendObjectType(Name = "Query")]
    public class PositionQueries
    {
        [Authorize(Policy = "DevDepartment")]
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