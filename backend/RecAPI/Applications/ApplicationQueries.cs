using System;
using System.Collections.Generic;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Types.Relay;
using RecAPI.Applications.Repositories;
using RecAPI.Applications.Models;
using RecAPI.Generic.InputType;
using RecAPI.Auth.Models;
using HotChocolate.AspNetCore.Authorization;

namespace RecAPI.Applications.Queries
{
    [ExtendObjectType(Name = "Query")]
    public class ApplicationQueries
    {
        [Authorize(Policy = "administrator")]
        [UsePaging]
        [UseFiltering]
        [UseSorting]
        public IEnumerable<Application> GetApplications(
            [Service]IApplicationRepository repository
            ) =>
            repository.GetApplications();

        [Authorize(Policy = "administrator")]
        public Application GetApplication(
            SingleModelInput input,
            [Service]IApplicationRepository repository
        )
        {
            return repository.GetApplication(input.Id);
        }
        
        [Authorize]
        public Application GetMyApplication(
            [GlobalState("currentUser")] CurrentUser user,
            [Service] IApplicationRepository repository
        )
        {
            var application = repository.GetUserApplication(user.UserId);
            return application;
        }
    }
}