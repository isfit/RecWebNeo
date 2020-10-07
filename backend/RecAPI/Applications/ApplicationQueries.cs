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
using RecAPI.Auth.Repositories;
using RecAPI.Positions.Models;
using RecAPI.Positions.Repositories;

namespace RecAPI.Applications.Queries
{
    [ExtendObjectType(Name = "Query")]
    public class ApplicationQueries
    {
        [Authorize(Policy = "internal")]
        [UsePaging]
        [UseFiltering]
        [UseSorting]
        public IEnumerable<Application> GetApplications(
            [GlobalState("currentUser")] CurrentUser user,
            [Service] IAuthRepository authRepository,
            [Service] IUserRepository userRepository,
            [Service] IApplicationRepository applicationRepository,
            [Service] IPositionRepository positionRepository,
            [Service] IInterviewRepository interviewRepository
        )
        {
            var currentUser = authRepository.GetAuthUser(user.UserId);
            var applications = applicationRepository.GetApplications();
            if (currentUser.Roles.Contains("superuser"))
            {
                return applications;
            }
            var filteredApplicationsList = applications.Where(appl =>
            {
                var applicant = userRepository.GetUserByAuth(appl.Applicant);
                return (applicant?.Approved ?? false) == true;
            }).ToList();
            if (currentUser.Roles.Contains("admin"))
            {
                return filteredApplicationsList;
            }
            // After this is internal user
            var givenUser = userRepository.GetUserByAuth(user.UserId);
            var userTeams = givenUser.Teams;
            if (userTeams == null || userTeams.Count() <= 0)
            {
                return null;
            }
            var filteredApplicationsByTeams = filteredApplicationsList?.Where(appl =>
            {
                foreach(var posId in appl.Positions.Values)
                {
                    Position position = positionRepository.GetPosition(posId);
                    if (position != null && userTeams.Contains(position.Team))
                    {
                        return true;
                    }
                }
                return false;

            }).ToList();
            if (currentUser.Roles.Contains("teamleader"))
            {
                return filteredApplicationsByTeams;
            }
            var connectedApplications = filteredApplicationsByTeams.Where(appl => {
                var interview = interviewRepository.GetApplicationInterview(appl.Id);
                return interview.Interviewers.Any(x => x.User == givenUser.Id);
            });
            // If not, its internal and should only be the ones with connected interviews
            return filteredApplicationsByTeams;
        }

        [Authorize(Policy = "administrator")]
        public Application GetApplication(
            SingleModelInput input,
            [Service]IApplicationRepository repository
        )
        {
            return repository.GetApplication(input.Id);
        }


        [Authorize(Policy = "administrator")]
        [UsePaging]
        [UseFiltering]
        [UseSorting]
        public List<Application> GetApplicationWithoutInterview(
            [GlobalState("currentUser")] CurrentUser user,
            [Service] IAuthRepository authRepository,
            [Service] IUserRepository userRepository,
            [Service] IInterviewRepository interviewRepository,
            [Service] IApplicationRepository applicationRepository
        )
        {
            var currentUser = authRepository.GetAuthUser(user.UserId);
            List<Interview> interviews = interviewRepository.GetInterviews();
            List<string> applicationsWithInterview = interviews.Select(x => x.Application).ToList();
            var applications = applicationRepository.GetApplicationWithout(applicationsWithInterview ?? new List<string>());
            if (currentUser.Roles.Contains("superuser"))
            {
                return applications;
            }
            var filteredApplicationsList = applications.Where(appl =>
            {
                var user = userRepository.GetUserByAuth(appl.Applicant);
                return (user?.Approved ?? false) == true;
            }).ToList();
            return filteredApplicationsList;
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