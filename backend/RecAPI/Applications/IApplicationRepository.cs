using System;
using System.Collections.Generic;
using RecAPI.Applications.Models;

namespace RecAPI.Applications.Repositories
{
    public interface IApplicationRepository
    {
        List<Application> GetApplications();
        Application GetApplication(string id);
        Application GetUserApplication(string userId);
        
        Application CreateApplication(Application application);
        Application UpdateApplication(string applicationId, Application application);
        bool DeleteApplication(string id);
        bool DeleteUserApplication(string userId);
        bool CheckExistanceOfApplication(string userId, string admisionPeriode);
    }
}