using System;
using System.Collections.Generic;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Types.Relay;
using RecAPI.Organizations.Repositories;
using RecAPI.Organizations.Models;
using RecAPI.Generic.InputType;
using HotChocolate.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;

namespace RecAPI.Organizations.Queries
{
    [ExtendObjectType(Name = "Query")]
    public class OrganizationQueries
    {
        [Authorize]
        public IEnumerable<Organization> GetOrganizations(
            [Service]IOrganizationRepository repository
        ) =>
        repository.GetOrganizations();
    
        public Organization GetOrganization(
            SingleModelInput input,
            [Service]IOrganizationRepository repository
        )
        {
            return repository.GetOrganization(input.Id);
        }
        
        [Authorize]
        public Organization GetOrganizationByName(
            SingleModelNameInput input,
            [Service]IOrganizationRepository repository
        )
        {
            return repository.GetOrganization(input.Name);
        }
    }
}