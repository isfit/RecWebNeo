using System;
using System.Collections.Generic;
using RecAPI.Users.Models;

namespace RecAPI.Users.Repositories
{
    public interface IUserRepository
    {
        List<User> GetUsers();
        List<User> GetUsers(List<string> ids);
        List<User> GetUsersByEmail(List<string> email);
        User GetUser(string id);
        User GetUserByEmail(string email);
        User GetUserByAuth(string authId);

        User CreateUser(User user);
        User UpdateUser(string id, User updatedUser);
        bool DeleteUser(string id);
    }
}