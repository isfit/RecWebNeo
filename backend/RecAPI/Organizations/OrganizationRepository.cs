using System.Collections.Generic;
using RecAPI.Organizations.Models;
using System.Linq;
using RecAPI.Database;

using MongoDB.Driver;

namespace RecAPI.Organizations.Repositories
{
    public class OrganizationRepository : IOrganizationRepository
    {
        private readonly IMongoCollection<Organization> _organizations;
        public OrganizationRepository(IRecWebDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _organizations = database.GetCollection<Organization>(settings.OrganizationCollectionName);
        }
        public IEnumerable<Organization> GetOrganizations()
        {
            var data = _organizations.Find(organization => true).ToList();
            return data;
        }
        public IEnumerable<Organization> GetOrganizations(List<string> ids)
        {
            var data = _organizations.Find(organization => ids.Contains(organization.Id)).ToList();
            return data;
        }
        public IEnumerable<Organization> GetOrganizationsByName(List<string> names)
        {
            var data = _organizations.Find(organization => names.Contains(organization.Name)).ToList();
            return data;
        }
        public Organization GetOrganization(string id)
        {
            var data = _organizations.Find(organization => organization.Id == id).FirstOrDefault();
            return data;
        }
        public Organization GetOrganizationByName(string name)
        {
            var data = _organizations.Find(organization => organization.Name == name).FirstOrDefault();
            return data;
        }
        public Organization CreateOrganization(Organization organization)
        {
            _organizations.InsertOne(organization);
            return GetOrganization(organization.Id);
        }
        public Organization UpdateOrganization(string id, Organization updateOrganization)
        {
            _organizations.ReplaceOne(organization => organization.Id == id, updateOrganization);
            return GetOrganization(id);
        }
        public bool DeleteOrganization(string id)
        {
            // TODO: If deleted, delete all Sections connected to this organization?
            var actionResult =_organizations.DeleteOne(organization => organization.Id == id);
            return actionResult.IsAcknowledged && actionResult.DeletedCount > 0;
        }
    }
}