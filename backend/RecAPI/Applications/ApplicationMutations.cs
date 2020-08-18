using System;
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

        [Authorize]
        public bool DeleteApplication(
            [GlobalState("currentUser")] CurrentUser user,
            [Service]IApplicationRepository repository
        )
        {
            return repository.DeleteUserApplication(user.UserId);
        }

    }
}