using System;
using System.Collections.Generic;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Types.Relay;
using RecAPI.Applications.Repositories;
using RecAPI.Applications.Models;
using RecAPI.Generic.InputType;

namespace RecAPI.Applications.Queries
{
    [ExtendObjectType(Name = "Query")]
    public class ApplicationQueries
    {
        [UsePaging]
        //[UseFiltering]
        //[UseSorting]
        public IEnumerable<Position> GetApplications(
            [Service]IApplicationRepository repository
            ) =>
            repository.GetApplications();

        public Position GetApplication(
            SingleModelInput input,
            [Service]IApplicationRepository repository
            )
            {
                return repository.GetApplication(input.Id);
            }

        // TODO: Get My Application
    }
}