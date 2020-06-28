using System.Collections.Generic;
using HotChocolate;
using HotChocolate.Types;

namespace RecAPI.Queries
{
    [ExtendObjectType(Name = "Query")]
    public class BaseQueries
    {
        public string Hello => "World";

        public string Secret => "Hush";

    }
}