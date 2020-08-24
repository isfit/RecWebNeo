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
            return false;
        }

        private bool UserDeleteInterviewTime()
        {
            return false;
        }

        // Create interview
        public Interview CreateInterview(
            CreateInterviewInput input,
            [Service] IInterviewRepository interviewRepository,
            [Service] IUserRepository userRepository,
            [Service]IApplicationRepository applicationRepository
        )
        {
            // Check that the application exists
            var application = applicationRepository.GetApplication(input.Application);
            if (application == null) {
                ApplicationError.ApplicationExistError();
            }
            // Check that Application does not already have an Interview
            var interview = interviewRepository.GetApplicationInterview(input.Application);
            if (interview == null) {
                InterviewError.InterviewAlreadyExistsError();
            }
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
                        if (userAvailable)
                        {
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
                        UserError.UserNotAvailableError(userEmail);
                    } else{
                        UserError.UserExistError(userEmail);
                    }
                }
            }
            // Create Interview
            InterviewConnections applicant = new InterviewConnections(){
                User = application.Applicant,
                Accepted = false
            };
            var newInterview = new Interview()
            {
                Start = input.Start,
                Application = input.Application,
                Applicant = applicant,
                Interviewers = interviewers,
                Location = input.Location
            };
            return interviewRepository.CreateInterview(newInterview);
        }

        // Update interview
        public Interview UpdateInterview(
            [Service] IInterviewRepository interviewRepository
            )
        {
            // Check that the Interview exists
            // Check that users exists
            // Check that the users are available at that time
            // Add the times to the users Interview times
            // Remove the Interview times from the prev users
            // Create Interview
            // Save Interview
            return null;
        }

        // Add interviewer
        public bool AddInterviewerToInterview(
            [Service] IInterviewRepository interviewRepository
        )
        {
            // Check that the Interview exists
            // Check that the user exists
            // Check that the user is available
            // Add the user to the Interview
            // Set the time as Interview busy
            return false;
        }

        // Remove interviewer
        public bool RemoveInterviewerToInterview(
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


        // Hente ut fra application hvilke seksjoner / teams det tilhører ?
    }
}
