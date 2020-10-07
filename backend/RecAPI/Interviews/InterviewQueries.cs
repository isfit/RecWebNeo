using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
using HotChocolate.Types.Relay;
using RecAPI.AdmisionPeriodes.Models;
using RecAPI.Auth.Models;
using RecAPI.Auth.Repositories;
using RecAPI.Generic.InputType;
using RecAPI.Interviews.Models;
using RecAPI.Interviews.Repositories;
using RecAPI.Organizations.Repositories;
using RecAPI.Users.ErrorHandling;
using RecAPI.Users.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Intrinsics.X86;
using System.Threading.Tasks;
using RecAPI.Applications.ErrorHandling;
using RecAPI.Positions.Models;
using RecAPI.Positions.Repositories;
using RecAPI.Applications.Repositories;
using RecAPI.Applications.Models;

namespace RecAPI.Interviews.Queries
{
    [ExtendObjectType(Name = "Query")]
    public class InterviewQueries
    {
        [Authorize(Policy = "teamleader")]
        [UsePaging]
        [UseFiltering]
        [UseSorting]
        public IEnumerable<Interview> GetInterviews(
            [GlobalState("currentUser")] CurrentUser currentUser,
            [Service] IInterviewRepository interviewRepository,
            [Service] IUserRepository userRepository,
            [Service] IAuthRepository authRepository,
            [Service] IApplicationRepository applicationRepository,
            [Service]IPositionRepository positionRepository
        )
        {
            var currentAuthUser = authRepository.GetAuthUser(currentUser.UserId);
            var interviews = interviewRepository.GetInterviews();
            if (currentAuthUser.Roles.Contains("superuser"))
            {
                return interviews;
            }
            var filteredInterviews = interviews.Where(interview =>
            {
                var applicant = userRepository.GetUser(interview.Applicant.User);
                return (applicant?.Approved ?? false) == true;
            }).ToList();
            if (currentAuthUser.Roles.Contains("admin"))
            {
                return filteredInterviews;
            }

            var user = userRepository.GetUserByAuth(currentAuthUser.Id);
            var userTeams = user.Teams;
            if (userTeams == null || userTeams.Count() <= 0)
            {
                UserError.UserNotAssignedTeam();
            }
            var filteredInterviewsByTeam = filteredInterviews.Where(interview =>
            {
                var application = applicationRepository.GetApplication(interview.Application);
                foreach(var posId in application.Positions.Values)
                {
                    Position position = positionRepository.GetPosition(posId);
                    if (position != null && userTeams.Contains(position.Team))
                    {
                        return true;
                    }
                }
                return false;
            }).ToList();
            return filteredInterviewsByTeam;
        }

        [Authorize(Policy = "administrator")]
        [UsePaging]
        [UseFiltering]
        [UseSorting]
        public Interview GetInterview(
            SingleModelInput input,
            [Service] IInterviewRepository interviewRepository
        )
        {
            return interviewRepository.GetInterview(input.Id);
        }

        [Authorize(Policy = "administrator")]
        [UsePaging]
        [UseFiltering]
        [UseSorting]
        public List<Interview> GetUserInterviews(
            SingleModelNameInput input,
            [Service] IInterviewRepository interviewRepository,
            [Service] IUserRepository userRepository
        )
        {
            var user = userRepository.GetUserByEmail(input.Name);
            if (user == null)
            {
                UserError.UserExistError(input.Name);
            }
            var myInterview = interviewRepository.GetUserInterview(user.Id);
            var connectedInterviews = interviewRepository.GetUserConnectedInterviews(user.Id);
            if (connectedInterviews == null)
            {
                var interviews = new List<Interview>();
                interviews.Add(myInterview);
                return interviews;
            }
            var filteredInterviews = connectedInterviews.Where(interview =>
            {
                var applicant = userRepository.GetUser(interview.Applicant.User);
                return (applicant?.Approved ?? false) == true;
            }).ToList() ?? new List<Interview>();
            filteredInterviews.Add(myInterview);
            return filteredInterviews;
        }

        [Authorize]
        [UsePaging]
        [UseFiltering]
        [UseSorting]
        public List<Interview> GetMyInterviews(
            [GlobalState("currentUser")] CurrentUser authUser,
            [Service] IInterviewRepository interviewRepository,
            [Service] IUserRepository userRepository
        )
        {
            var user = userRepository.GetUserByAuth(authUser.UserId);
            if (user == null)
            {
                UserError.UserExistError("");
            }
            var myInterview = interviewRepository.GetUserInterview(user.Id);
            var connectedInterviews = interviewRepository.GetUserConnectedInterviews(user.Id);
            if (connectedInterviews == null)
            {
                var interviews = new List<Interview>();
                if (myInterview != null) {
                    interviews.Add(myInterview);
                }
                return interviews;
            }
            var filteredInterviews = connectedInterviews.Where(interview =>
            {
                var applicant = userRepository.GetUser(interview.Applicant.User);
                return applicant != null ? applicant.Approved : false;
            }).ToList() ?? new List<Interview>();
            if (myInterview != null) {
                connectedInterviews.Add(myInterview);
            }
            return connectedInterviews;
        }

    }
}
