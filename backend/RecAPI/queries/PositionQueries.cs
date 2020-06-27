using System;
using System.Collections.Generic;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Types.Relay;
using RecAPI.Repositories;
using RecAPI.Models;

namespace RecAPI.Queries
{
    [ExtendObjectType(Name = "Query")]
    public class PositionQueries
    {
        public IEnumerable<Position> GetPositions(
            [Service]IPositionRepository repository
            ) =>
            repository.GetPositions();
    }
}
