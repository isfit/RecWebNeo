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
using RecAPI.Applications.ErrorHandling;

namespace RecAPI.Applications.Mutations
{
    [ExtendObjectType(Name= "Mutation")]
    public class ApplicationMutations
    {

        public Application CreateApplication(
            CreateApplicationInput input,
            [Service]IApplicationRepository repository
        )
        {
            // TODO: Error checking. Does there already exist an application?
            // Different application for different application periode?
            var application = new Application()
            {
                Positions = input.Positions;
                Prioritized = input.Prioritized;
                ApplicationText = input.ApplicationText;
                Available = input.Available;
                PreferDigital = input.PreferDigital;
            }   
            return repository.CreateApplication(application);
        }

        public Application UpdateApplication(
            UpdateApplicationInput input,
            [Service]IApplicationRepository repository
        )
        {
            // TODO: Error cheking
            var userId = "123";
            var application = repository.GetUserApplication(userId);
            var updateApplication = new Application()
            {
                Positions = input.Positions ?? application.Positions;
                Prioritized = input.Prioritized ?? application.Prioritized;
                ApplicationText = input.ApplicationText ?? application.ApplicationText;
                Available = input.Available ?? application.Available;
                PreferDigital = input.PreferDigital ?? application.PreferDigital;
            }
            return repository.UpdatePosition(input.Id, updatePosition);
        }

        public bool DeleteApplication(
            SingleModelInput input,
            [Service]IApplicationRepository repository
        )
        {
            return repository.DeleteApplication(input.Id);
        }

    }
}