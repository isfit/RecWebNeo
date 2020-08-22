using MongoDB.Driver;
using RecAPI.Database;
using RecAPI.Interviews.Models;
using RecAPI.Users.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecAPI.Interviews.Repositories
{
    public class InterviewRepository : IInterviewRepository
    {
        private readonly IMongoCollection<Interview> _interviews;
        public InterviewRepository(IRecWebDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _interviews = database.GetCollection<Interview>(settings.InterviewCollectionName);
        }

        public List<Interview> GetInterviews()
        {
            return _interviews.Find(interview => true).ToList();
        }

        public Interview GetInterview(string id)
        {
            return _interviews.Find(interview => interview.Id == id).FirstOrDefault();
        }

        public Interview GetApplicationInterview(string applicationId)
        {
            return _interviews.Find(interview => interview.Application == applicationId).FirstOrDefault();
        }

        public Interview CreateInterview(Interview interview)
        {
            _interviews.InsertOne(interview);
            return GetInterview(interview.Id);
        }

        public Interview UpdateInterview(string id, Interview interview)
        {
            _interviews.ReplaceOne(inter => inter.Id == id, interview);
            return GetInterview(id);
        }

        public bool DeleteInterview(string id)
        {
            var actionResult = _interviews.DeleteOne(interview => interview.Id == id);
            return actionResult.IsAcknowledged && actionResult.DeletedCount > 0;
        }
    }
}
