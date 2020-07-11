using System.Collections.Generic;
using RecAPI.Organizations.Models;

namespace RecAPI.Organizations.Repositories
{
    public interface IOrganizationRepository
    {
        IEnumerable<Organization> GetOrganizations();
        IEnumerable<Organization> GetOrganizations(List<string> ids);
        IEnumerable<Organization> GetOrganizationsByName(List<string> names);
        Organization GetOrganization(string id);
        Organization GetOrganizationByName(string name);
        Organization CreateOrganization(Organization organization);
        Organization UpdateOrganization(string id, Organization updateOrganization);
        bool DeleteOrganization(string id);
    }
}