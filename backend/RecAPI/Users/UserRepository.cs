using System;
using System.Collections.Generic;
using RecAPI.Users.Models;
using MongoDB.Driver;
using RecAPI.Database;

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
            return null;
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
            return null;
        }
        public User GetUserByAuth(string authId)
        {
            return _users.Find(user => user.AuthId == authId).FirstOrDefault(); 
        }
        public User GetUserByEmail(string email)
        {
            return _users.Find(user => user.Email == email).FirstOrDefault();
        }
        public User CreateUser(User user)
        {
            _users.InsertOne(user);
            return GetUserByEmail(user.Email);
        }
        public User UpdateUser(string id, User updatedUser)
        {
            return null;
        }
        public bool DeleteUser(string id)
        {
            return false;
        }
    }
}