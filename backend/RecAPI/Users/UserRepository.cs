using System;
using System.Collections.Generic;
using RecAPI.Users.Models;

namespace RecAPI.Users.Repositories
{
    public class UserRepository : IUserRepository
    { 
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
        public User GetUserByEmail(string email)
        {
            return null;
        }
        public User CreateUser(User user)
        {
            return null;
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