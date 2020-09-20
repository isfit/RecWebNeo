using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecAPI.Generic
{
    [ExtendObjectType(Name = "Mutation")]
    public class GenericMutation
    {

        [Authorize(Policy = "superuser")]
        public bool PurgeDatabase(
            [Service] IGenericRepository genericRepository
        )
        {
            genericRepository.purgeDatabase();
            return true;
        }

    }
}
