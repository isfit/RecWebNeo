using System.Collections.Generic;
using RecAPI.AdmisionPeriodes.Models;
using System.Linq;
using RecAPI.Database;
using MongoDB.Driver;
namespace RecAPI.AdmisionPeriodes.Repositories
{
    public class AdmisionPeriodeRepository : IAdmisionPeriodeRepository
    {
        private readonly IMongoCollection<AdmisionPeriode> _admisionPeriode;
        public AdmisionPeriodeRepository(IRecWebDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _admisionPeriode = database.GetCollection<AdmisionPeriode>(settings.AdmisionPeriodeCollectionName);
        }
        public IEnumerable<AdmisionPeriode> GetAdmisionPeriodes()
        {
            var data = _admisionPeriode.Find(admisionPeriode => true).ToList();
            return data;
        }
        public IEnumerable<AdmisionPeriode> GetAdmisionPeriodes(List<string> ids)
        {
            var data = _admisionPeriode.Find(admisionPeriode => ids.Contains(admisionPeriode.Id)).ToList();
            return data;
        }
        public IEnumerable<AdmisionPeriode> GetAdmisionPeriodesByOrganization(string organizationId)
        {
            var data = _admisionPeriode.Find(admisionPeriode => admisionPeriode.Organization == organizationId).ToList();
            return data;
        }
        public AdmisionPeriode GetAdmisionPeriode(string id)
        {
            var data = _admisionPeriode.Find(admisionPeriode => admisionPeriode.Id == id).FirstOrDefault();
            return data;
        }
        public AdmisionPeriode CreateAdmisionPeriode(AdmisionPeriode admisionPeriode)
        {
            _admisionPeriode.InsertOne(admisionPeriode);
            return GetAdmisionPeriode(admisionPeriode.Id);
        }
        public AdmisionPeriode UpdateAdmisionPeriode(string id, AdmisionPeriode updateAdmisionPeriode)
        {
            _admisionPeriode.ReplaceOne(admisionPeriode => admisionPeriode.Id == id, updateAdmisionPeriode);
            return GetAdmisionPeriode(id);
        }
        public bool DeleteAdmisionPeriode(string id)
        {
            var actionResult = _admisionPeriode.DeleteOne(admisionPeriode => admisionPeriode.Id == id);
            return actionResult.IsAcknowledged && actionResult.DeletedCount > 0;
        }
    }
}