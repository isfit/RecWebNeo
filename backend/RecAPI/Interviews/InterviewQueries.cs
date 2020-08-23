using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
using HotChocolate.Types.Relay;
using RecAPI.AdmisionPeriodes.Models;
using RecAPI.Auth.Models;
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

namespace RecAPI.Interviews.Queries
{
    [ExtendObjectType(Name = "Query")]
    public class InterviewQueries
    {
        [Authorize(Policy = "administrator")]
        [UsePaging]
        [UseFiltering]
        [UseSorting]
        public IEnumerable<Interview> GetInterviews(
            [Service] IInterviewRepository interviewRepository
        )
        {
            return interviewRepository.GetInterviews();
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
            // TODO: Add suport for multiple admissionPeriodes
            return interviewRepository.GetUserInterviews(user.Id);
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
            // TODO: Add suport for multiple admissionPeriodes
            return interviewRepository.GetUserInterviews(user.Id);
        }

        // TODO: Accept or Reject interview

    }
}
