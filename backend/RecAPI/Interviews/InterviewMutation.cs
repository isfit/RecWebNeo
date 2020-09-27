using HotChocolate;
using RecAPI.Generic.InputType;
using RecAPI.Interviews.Models;
using RecAPI.Interviews.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RecAPI.Interviews.Input;
using RecAPI.Users.Repositories;
using RecAPI.Applications.Repositories;
using RecAPI.Users.ErrorHandling;
using RecAPI.Applications.ErrorHandling;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
using HotChocolate.Types.Relay;
using RecAPI.Auth.Repositories;
using RecAPI.Auth.Models;
using RecAPI.Users.Models;
using RecAPI.Auth.ErrorHandling;


namespace RecAPI.Interviews.Mutations
{
    [ExtendObjectType(Name= "Mutation")]
    public class InterviewMutations
    {

        private bool UserAddInterviewTime(string userId, DateTime date, [Service] IUserRepository userRepository)
        {
            var user = userRepository.GetUser(userId);
            if (user.InterviewTime == null) {
                user.InterviewTime = new List<DateTime>();
            }
            if(!user.InterviewTime.Contains(date) )
            {
                user.InterviewTime.Add(date);
            }
            return userRepository.UpdateUser(userId, user).InterviewTime.Contains(date);
        }

        private bool UserDeleteInterviewTime(string userId, DateTime date, [Service] IUserRepository userRepository)
        {
            var user = userRepository.GetUser(userId);
            if (user.InterviewTime == null) {
                return true;
            }
            if(user.InterviewTime.Contains(date) )
            {
                user.InterviewTime.Remove(date);
            }
            return !userRepository.UpdateUser(userId, user).InterviewTime.Contains(date);
        }

        // Create interview
        [Authorize(Policy = "administrator")]
        public Interview CreateInterview(
            CreateInterviewInput input,
            [Service] IInterviewRepository interviewRepository,
            [Service] IUserRepository userRepository,
            [Service]IApplicationRepository applicationRepository
        )
        {
            // Check interview time is in future
            if (input.Start <= DateTime.Now)
            {
                InterviewError.InterviewTimeNotAllowed();
            }
            // Check that the application exists
            var application = applicationRepository.GetApplication(input.Application);
            if (application == null) {
                ApplicationError.ApplicationExistError();
            }
            // Check that Application does not already have an Interview
            var interview = interviewRepository.GetApplicationInterview(input.Application);
            if (interview != null) {
                InterviewError.InterviewAlreadyExistsError();
            }
            var applicantUserObject = userRepository.GetUserByAuth(application.Applicant);
            // TODO: Check if applicant is available at this time

            List<InterviewConnections> interviewers = new List<InterviewConnections>();
            // Check that users exists
            if (input.InterviewerEmails != null && input.InterviewerEmails.Count() > 0)
            {
                foreach(string userEmail in input.InterviewerEmails)
                {
                    var interviewer = userRepository.GetUserByEmail(userEmail);
                    if (interviewer != null){
                        // Check that the users are available at that time
                        bool userAvailable = userRepository.CheckUserAvailable(interviewer.Id, input.Start);
                        if (!userAvailable)
                        {
                            UserError.UserNotAvailableError(userEmail);
                        }
                    } else{
                        UserError.UserExistError(userEmail);
                    }
                }
                foreach(string userEmail in input.InterviewerEmails){
                    var interviewer = userRepository.GetUserByEmail(userEmail);
                    // Add time to users interview times
                    UserAddInterviewTime(interviewer.Id, input.Start, userRepository);
                    // Create InterviewConnections object and add to list
                    InterviewConnections interviewConnection = new InterviewConnections()
                    {
                        User = interviewer.Id,
                        Accepted = false
                    };
                    interviewers.Add(interviewConnection);
                }
            }
            // Create Interview
            InterviewConnections applicant = new InterviewConnections(){
                User = applicantUserObject.Id,
                Accepted = false
            };
            var newInterview = new Interview()
            {
                Start = input.Start,
                Application = input.Application,
                Applicant = applicant,
                Interviewers = interviewers,
                Location = input.Location ?? ""
            };
            return interviewRepository.CreateInterview(newInterview);
        }

        // Update interview
        [Authorize(Policy = "administrator")]
        public Interview UpdateInterview(
            UpdateInterviewInput input,
            [Service] IInterviewRepository interviewRepository,
            [Service] IUserRepository userRepository,
            [Service]IApplicationRepository applicationRepository
            )
        {
            // Check interview time is in future
            if (input.Start != null && input.Start <= DateTime.Now)
            {
                InterviewError.InterviewTimeNotAllowed();
            }
            // Check that Application does not already have an Interview
            var interview = interviewRepository.GetInterview(input.Id);
            if (interview == null) {
                InterviewError.InterviewDoesNotExistsError();
            }
            // Check that users exists
            // Check that the users are available at that time
            // Add the times to the users Interview times
            List<InterviewConnections> oldInterviewConnections = interview.Interviewers;
            List<InterviewConnections> newInterviewConnections = new List<InterviewConnections>();
            if (input.InterviewerEmails != null && input.InterviewerEmails.Count() > 0)
            {
                foreach(string userEmail in input.InterviewerEmails)
                {
                    var interviewer = userRepository.GetUserByEmail(userEmail);
                    if (interviewer != null){
                        var userConnection = oldInterviewConnections.Find(userConn => userConn.User == interviewer.Id);
                        bool userAvailable = userRepository.CheckUserAvailable(interviewer.Id, input.Start ?? interview.Start);
                        if (userConnection != null && (interview.Start == null || input.Start.Equals(interview.Start) )) {
                            newInterviewConnections.Add(userConnection);
                        }
                        // Check that the users are available at that time
                        else if (!userAvailable)
                        {
                            UserError.UserNotAvailableError(userEmail);
                        }
                    } else{
                        UserError.UserExistError(userEmail);
                    }
                }
                foreach(string userEmail in input.InterviewerEmails){
                    var interviewer = userRepository.GetUserByEmail(userEmail);
                    var userConnection = oldInterviewConnections.Find(userConn => userConn.User == interviewer.Id);
                    if (userConnection == null) {
                        // Add time to users interview times
                        UserAddInterviewTime(interviewer.Id, input.Start ?? interview.Start, userRepository);
                        // Create InterviewConnections object and add to list
                        InterviewConnections interviewConnection = new InterviewConnections()
                        {
                            User = interviewer.Id,
                            Accepted = false
                        };
                        newInterviewConnections.Add(interviewConnection);
                    }
                }
            }
            List<InterviewConnections> removedInterviewConnections = oldInterviewConnections
                                                                        .Where(
                                                                            x => !newInterviewConnections.Any(y => y.User == x.User)
                                                                        )
                                                                        .ToList();
            foreach(InterviewConnections user in removedInterviewConnections){
                UserDeleteInterviewTime(user.User, input.Start ?? interview.Start, userRepository);
            }

            // Create Interview
            // Remove the Interview times from the prev users
            // Create Interview
            // Save Interview
            var newInterview = new Interview()
            {
                Id = interview.Id,
                Start = input.Start ?? interview.Start,
                Application = interview.Application,
                Applicant = interview.Applicant,
                Interviewers = newInterviewConnections,
                Location = input.Location ?? interview.Location,
                Status = interview.Status
            };
            return interviewRepository.UpdateInterview(interview.Id, newInterview);
        }

        [Authorize(Policy = "internal")]
        public Interview SetInterviewStatus(
            [GraphQLNonNullType] string interviewId,
            [GraphQLNonNullType] string interviewStatus,
            [GlobalState("currentUser")] CurrentUser currentUser,
            [Service] IAuthRepository authRepository,
            [Service] IUserRepository userRepository,
            [Service] IInterviewRepository interviewRepository
        )
        {
            var interview = interviewRepository.GetInterview(interviewId);
            if (interview == null){
                InterviewError.InterviewDoesNotExistsError();
            }
            // Check that if internal, you have access to the interview
            var authUser = authRepository.GetAuthUser(currentUser.UserId);
            var user = userRepository.GetUserByAuth(currentUser.UserId);
            if (user == null || authUser == null){
                UserError.NoUsersExist();
            }
            if (authUser.Roles.Contains("internal"))
            {
                Boolean connectedInterview = interview.Interviewers.Any(x => x.User == user.Id) || interview.Applicant.User == user.Id;
                AuthError.AuthorizationError();
                return null;
            }
            interview.Status = interviewStatus;
            return interviewRepository.UpdateInterview(interview.Id, interview);
        }

        // Add interviewer
        [Authorize(Policy = "administrator")]
        public bool AddInterviewerToInterview(
            InterviewerAtInterviewInput input,
            [Service] IInterviewRepository interviewRepository,
            [Service] IUserRepository userRepository,
            [Service]IApplicationRepository applicationRepository
        )
        {
            // Check that the Interview exists
            var interview = interviewRepository.GetInterview(input.Interview);
            if (interview == null) {
                InterviewError.InterviewDoesNotExistsError();
            }
            // Check that the user exists
            // Check that the user is available
            // Add the user to the Interview
            // Set the time as Interview busy
            return false;
        }

        // Remove interviewer
        [Authorize(Policy = "administrator")]
        public bool RemoveInterviewerFromInterview(
            [Service] IInterviewRepository interviewRepository
        )
        {
            // Check that the Interview exists
            // Check that the user exists
            // Check that the user is part of that interview
            // Add the user to the Interview
            // Set the time as Interview busy
            return false;
        }

        // Accept and Reject Interview
        [Authorize]
        public bool AcceptInterview(
            [Service] IInterviewRepository interviewRepository
        )
        {
            // Check that the Interview exists
            // Check that the user is part of the Interview
            // Set respons of the user
            return false;
        }

        // Delte interview
        [Authorize(Policy = "administrator")]
        public bool DeleteInterview(
            SingleModelInput input,
            [Service] IInterviewRepository interviewRepository,
            [Service] IUserRepository userRepository
        )
        {
            var interview = interviewRepository.GetInterview(input.Id);
            if (interview == null) {
                InterviewError.InterviewDoesNotExistsError();
            }
            foreach (InterviewConnections interviewUser in interview.Interviewers)
            {
                UserDeleteInterviewTime(interviewUser.User, interview.Start, userRepository);
            }
            return interviewRepository.DeleteInterview(interview.Id);
        }

        // Hente ut fra application hvilke seksjoner / teams det tilhører ?
    }
}
