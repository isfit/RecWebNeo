using System;
using HotChocolate;
using HotChocolate.Types;
using RecAPI.Organizations.Repositories;
using RecAPI.Organizations.Models;
using RecAPI.Organizations.InputType;
using RecAPI.Generic.InputType;
using HotChocolate.Execution;
using RecAPI.Organizations.ErrorHandeling;

namespace RecAPI.Organizations.Mutations
{
    [ExtendObjectType(Name= "Mutation")]
    public class OrganizationMutations
    {
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

        public bool DeleteOrganization(
            SingleModelInput input,
            [Service]IOrganizationRepository repository
        )
        {
            return repository.DeleteOrganization(input.Id);
        }
    }
}