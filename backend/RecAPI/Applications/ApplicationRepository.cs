using System;
using System.Collections.Generic;
using RecAPI.Applications.Models;
using MongoDB.Driver;
using RecAPI.Database;

namespace RecAPI.Applications.Repositories
{
    public class ApplicationRepository : IApplicationRepository
    {
        private readonly IMongoCollection<User> _applications;
        public ApplicationRepository(IRecWebDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _applications = database.GetCollection<User>(settings.ApplicationCollectionName);
        }

        public List<Application> GetApplications()
        {
            var applications = _applications.Find(application => true).ToList();
            return applications;
        }
        public Application GetApplication(string id)
        {
            var application = _applications.Find(application => application.Id == id).FirstOrDefault();
            return application;
        }
        public Application GetUserApplication(string userId)
        {
            var application = _applications.Find(appl => appl.Applicant == userId).FirstOrDefault();
            return application;
        }

        public Application CreateApplication(Application application)
        {
            var storedApplication = _applications.InsertOne(application);
            return storedApplication;
        }
        public Application UpdateApplication(string applicationId, Application application)
        {
            var updatedApplication = _applications.ReplaceOne(appl => appl.Id = applicationId, application);
            return updatedApplication;
        }
        public bool DeleteApplication(string id)
        {
            var actionResult =_applications.DeleteOne(application => application.Id == id);
            return actionResult.IsAcknowledged && actionResult.DeletedCount > 0;
        }
    }
}