using System;
using System.Collections.Generic;
using RecAPI.Applications.Models;
using MongoDB.Driver;
using RecAPI.Database;

namespace RecAPI.Applications.Repositories
{
    public class ApplicationRepository : IApplicationRepository
    {
        private readonly IMongoCollection<Application> _applications;
        public ApplicationRepository(IRecWebDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _applications = database.GetCollection<Application>(settings.ApplicationCollectionName);
        }

        public List<Application> GetApplications()
        {
            var applications = _applications.Find(appl => true).ToList();
            return applications;
        }
        public Application GetApplication(string id)
        {
            var application = _applications.Find(appl => appl.Id == id).FirstOrDefault();
            return application;
        }
        public Application GetUserApplication(string userId)
        {
            var application = _applications.Find(appl => appl.Applicant == userId).FirstOrDefault();
            return application;
        }

        public List<Application> GetApplicationWithout(List<string> applicationIds)
        {
            return _applications.Find(application => !applicationIds.Contains(application.Id)).ToList();
        }

        public Application CreateApplication(Application application)
        {
            _applications.InsertOne(application);
            return GetUserApplication(application.Applicant);
        }
        public Application UpdateApplication(string userId, Application application)
        {
            _applications.ReplaceOne(appl => appl.Applicant == userId, application);
            return GetUserApplication(application.Applicant);
        }
        public bool DeleteApplication(string id)
        {
            var actionResult =_applications.DeleteOne(appl => appl.Id == id);
            return actionResult.IsAcknowledged && actionResult.DeletedCount > 0;
        }
        public bool DeleteUserApplication(string userId)
        {
            var actionResult = _applications.DeleteOne(appl => appl.Applicant == userId);
            return actionResult.IsAcknowledged && actionResult.DeletedCount > 0;
        }

        public bool CheckExistanceOfApplication(string userId, string admisionPeriode)
        {
            var application = _applications.Find(appl => appl.Applicant == userId && appl.AdmissionPeriode == admisionPeriode).FirstOrDefault();
            return application != null;
        }
    }
}