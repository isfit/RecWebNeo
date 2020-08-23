using System;
using System.Collections.Generic;
using RecAPI.Users.Models;
using MongoDB.Driver;
using RecAPI.Database;
using System.Linq;

namespace RecAPI.Users.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IMongoCollection<User> _users;
        public UserRepository(IRecWebDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _users = database.GetCollection<User>(settings.UserCollectionName);
        }

        public List<User> GetUsers()
        {
            return _users.Find(user => true).ToList();
        }
        public List<User> GetUsers(List<string> ids)
        {
            return null;
        }
        public List<User> GetUsersByEmail(List<string> email)
        {
            return null;
        }
        public User GetUser(string id)
        {
            var user = _users.Find(user => user.Id == id).FirstOrDefault();
            return user;
        }
        public User GetUserByAuth(string authId)
        {
            return _users.Find(user => user.AuthId == authId).FirstOrDefault(); 
        }
        public User GetUserByEmail(string email)
        {
            return _users.Find(user => user.Email == email).FirstOrDefault();
        }

        public List<User> GetAllAvailableUsers(DateTime date)
        {
            var noe = date.ToString();
            return _users.Find(user =>
                user.BusyTime.Any(time => time != date.ToString())) // && !user.InterviewTime.Contains(date.ToString()))
                .ToList();
        }

        public User CreateUser(User user)
        {
            _users.InsertOne(user);
            return GetUserByEmail(user.Email);
        }
        public User UpdateUser(string id, User updatedUser)
        {
            _users.ReplaceOne(user => user.Id == id, updatedUser);
            return GetUser(id);
        }
        public bool DeleteUser(string id)
        {
            var actionResult = _users.DeleteOne(user => user.Id == id);
            return actionResult.IsAcknowledged && actionResult.DeletedCount > 0;
        }
    }
}