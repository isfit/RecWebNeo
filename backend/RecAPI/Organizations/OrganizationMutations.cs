using System;
using HotChocolate;
using HotChocolate.Types;
using RecAPI.Organizations.Repositories;
using RecAPI.Organizations.Models;
using RecApi.Organizations.InputType;
using RecAPI.Generic.InputType;
using HotChocolate.Execution;

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
            var organizationNameExist = repository.GetOrganizationByName(input.Name);
            if (organizationNameExist != null){
                throw new QueryException(ErrorBuilder.New().SetMessage("Organization name already exist!").Build());
            }
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
            var organizationNameExist = input.Name == organization.Name ? false : repository.GetOrganizationByName(input.Name) != null;
            if (organizationNameExist)
            {
                throw new QueryException(ErrorBuilder.New().SetMessage("Organization name already exist!").Build());
            }
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