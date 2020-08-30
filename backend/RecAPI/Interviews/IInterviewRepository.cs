using RecAPI.Interviews.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecAPI.Interviews.Repositories
{
    public interface IInterviewRepository
    {

        List<Interview> GetInterviews();
        Interview GetInterview(string id);
        Interview GetApplicationInterview(string applicationId);
        List<Interview> GetUserInterviews(string userId);
        Interview GetInterviewByApplication(string applicationId);

        Interview CreateInterview(Interview interview);
        Interview UpdateInterview(string id, Interview interview);
        bool DeleteInterview(string id);
    }
}
