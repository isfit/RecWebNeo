using System;
using System.Collections.Generic;
using HotChocolate;
using HotChocolate.Types;
using RecAPI.Applications.Repositories;
using RecAPI.Applications.Models;
using RecAPI.Applications.InputType;
using RecAPI.Generic.InputType;
using RecAPI.Teams.Repositories;
using RecAPI.Sections.Repositories;
using RecAPI.AdmisionPeriodes.Repositories;
using HotChocolate.AspNetCore.Authorization;
using RecAPI.Auth.Models;
using RecAPI.Applications.ErrorHandling;
using RecAPI.Positions.Repositories;
using System.Linq;
using RecAPI.Users.Repositories;
using RecAPI.Users.ErrorHandling;
using RecAPI.Users.Models;

namespace RecAPI.Applications.Mutations
{
    [ExtendObjectType(Name= "Mutation")]
    public class ApplicationMutations
    {
        [Authorize]
        public Application CreateApplication(
            [GlobalState("currentUser")] CurrentUser user,
            CreateApplicationInput input,
            [Service]IApplicationRepository applicationRepository,
            [Service]IAdmisionPeriodeRepository admisionPeriodeRepository,
            [Service]IPositionRepository positionRepository
        )
        {
            ApplicationError.AlreadyRegisteredApplication(applicationRepository, user.UserId, input.AdmissionPeriode);
            ApplicationError.ValidAdmisionPeriode(admisionPeriodeRepository, input.AdmissionPeriode);
            ApplicationError.ValidPositions(positionRepository, admisionPeriodeRepository, input.Positions, input.AdmissionPeriode);
            var application = new Application()
            {
                Positions = input.Positions,
                AdmissionPeriode = input.AdmissionPeriode,
                Prioritized = input.Prioritized,
                ApplicationText = input.ApplicationText,
                Available = input.Available,
                Applicant = user.UserId,
                //PreferDigital = input.PreferDigital
            };
            application.setInterest(input.Interest);
            return applicationRepository.CreateApplication(application);
        }

        [Authorize]
        public Application UpdateApplication(
            [GlobalState("currentUser")] CurrentUser user,
            UpdateApplicationInput input,
            [Service] IApplicationRepository applicationRepository,
            [Service] IAdmisionPeriodeRepository admisionPeriodeRepository,
            [Service] IPositionRepository positionRepository
        )
        {
            var application = applicationRepository.GetUserApplication(user.UserId);
            if(application == null)
            {
                ApplicationError.ApplicationNotRegistered();
            }
            if (input.Positions != null)
            {
                ApplicationError.ValidPositions(positionRepository, admisionPeriodeRepository, input.Positions, application.AdmissionPeriode);
            }
            var updateApplication = new Application()
            {
                Id = application.Id,
                Applicant = application.Applicant,
                AdmissionPeriode = application.AdmissionPeriode,
                Positions = input.Positions ?? application.Positions,
                Prioritized = input.Prioritized ?? application.Prioritized,
                ApplicationText = input.ApplicationText ?? application.ApplicationText,
                Available = input.Available ?? application.Available,
                //PreferDigital = input.PreferDigital ?? application.PreferDigital
            };
            if (input.Interest != null)
            {
                updateApplication.setInterest(input.Interest);
            }
            return applicationRepository.UpdateApplication(user.UserId, updateApplication);
        }

        [Authorize(Policy = "superuser")]
        public bool DeleteUserApplication(
            SingleModelInput input,
            [Service] IApplicationRepository applicationRepository,
            [Service] IInterviewRepository interviewRepository,
            [Service] IUserRepository userRepository
        )
        {
            // Find an interview assossiated with the application
            var interview = interviewRepository.GetInterviewByApplication(input.Id);
            if (interview != null) {
                foreach (InterviewConnections interviewUser in interview.Interviewers)
                {
                    UserDeleteInterviewTime(interviewUser.User, interview.Start, userRepository);
                }
                interviewRepository.DeleteInterview(interview.Id);
            }
            return applicationRepository.DeleteApplication(input.Id);
        }

        [Authorize(Policy = "administrator")]
        public IEnumerable<DateTime> ApplicationBusyTimes(
            ApplicationBusyTimesInput input,
            [Service] IUserRepository userRepository,
            [Service] IApplicationRepository applicationRepository
        )
        {
            List<DateTime> busyTimes = new List<DateTime>();
            var application = applicationRepository.GetApplication(input.Application);
            if (application == null)
            {
                ApplicationError.ApplicationExistError();
            }
            List<DateTime> applicationBusyTimes = application.Available != null && application.Available.Count() > 0 ? application.Available : new List<DateTime>();
            busyTimes.AddRange(applicationBusyTimes);
            foreach(DateTime busyTimePoint in applicationBusyTimes)
            {
                DateTime addedDateTime = busyTimePoint;
                busyTimes.Add(addedDateTime.AddHours(1.0));
            }
            List<string> emails = input.InterviewerEmail != null && input.InterviewerEmail.Count() > 0 ? input.InterviewerEmail : new List<string>();
            var users = userRepository.GetUsersByEmail(emails);
            foreach(User user in users)
            {
                List<DateTime> userBusyTimes = user.BusyTime != null && user.BusyTime.Count() > 0 ? user.BusyTime : new List<DateTime>();
                List<DateTime> userInterviewTime = user.InterviewTime != null && user.InterviewTime.Count() > 0 ? user.InterviewTime : new List<DateTime>();
                busyTimes.AddRange(userBusyTimes);
                busyTimes.AddRange(userInterviewTime);
            }
            return busyTimes.Distinct();
        }

    }
}