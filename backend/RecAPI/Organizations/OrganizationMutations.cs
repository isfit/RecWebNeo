using System;
using HotChocolate;
using HotChocolate.Types;
using RecAPI.Organizations.Repositories;
using RecAPI.Organizations.Models;
using RecAPI.Organizations.InputType;
using RecAPI.Generic.InputType;
using HotChocolate.Execution;
using RecAPI.Organizations.ErrorHandling;
using HotChocolate.AspNetCore.Authorization;
using RecAPI.Positions.Repositories;
using RecAPI.Teams.Repositories;
using RecAPI.Sections.Repositories;
using RecAPI.Applications.Repositories;
using RecAPI.Auth.Repositories;
using RecAPI.Users.Repositories;
using RecAPI.AdmisionPeriodes.Repositories;
using RecAPI.Interviews.Repositories;

namespace RecAPI.Organizations.Mutations
{
    [ExtendObjectType(Name= "Mutation")]
    public class OrganizationMutations
    {
        [Authorize(Policy = "superuser")]
        public Organization CreateOrganization(
            CreateOrganizationInput input,
            [Service]IOrganizationRepository repository
        )
        {
            OrganizationError.UniqueNameError(repository, input.Name, null); // Checks if the organization name is unique
            var organization = new Organization()
            {
                Name = input.Name,
                Description = input.Description,
            };
            return repository.CreateOrganization(organization);
        }

        [Authorize(Policy = "superuser")]
        public Organization UpdateOrganization(
            UpdateOrganizationInput input,
            [Service]IOrganizationRepository repository
        )
        {
            var organization = repository.GetOrganization(input.Id);
            OrganizationError.UniqueNameError(repository, organization.Name, input.Name); // Checks if the organization name is unique
            var updatedOrganization = new Organization()
            {
                Id = input.Id,
                Name = input.Name ?? organization.Name,
                Description = input.Description ?? organization.Description
            };
            return repository.UpdateOrganization(input.Id, updatedOrganization);
        }

        [Authorize(Policy = "superuser")]
        public bool DeleteOrganization(
            SingleModelInput input,
            [Service]IOrganizationRepository repository
        )
        {
            return repository.DeleteOrganization(input.Id);
        }

    }
}