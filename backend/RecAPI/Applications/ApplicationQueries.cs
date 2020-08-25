using System;
using System.Linq;
using System.Collections.Generic;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Types.Relay;
using RecAPI.Applications.Repositories;
using RecAPI.Users.Repositories;
using RecAPI.Applications.Models;
using RecAPI.Generic.InputType;
using RecAPI.Applications.InputType;
using RecAPI.Auth.Models;
using RecAPI.Users.Models;
using HotChocolate.AspNetCore.Authorization;
using RecAPI.Interviews.Models;
using RecAPI.Interviews.Repositories;
using RecAPI.Applications.ErrorHandling;

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

        [Authorize(Policy = "administrator")]
        [UsePaging]
        [UseFiltering]
        [UseSorting]
        public List<Application> GetApplicationWithoutInterview(
            [Service] IInterviewRepository interviewRepository,
            [Service] IApplicationRepository repository
        )
        {
            List<Interview> interviews = interviewRepository.GetInterviews();
            List<string> applicationsWithInterview = interviews.Select(x => x.Application).ToList();
            return repository.GetApplicationWithout(applicationsWithInterview ?? new List<string>());
        }

    }
}