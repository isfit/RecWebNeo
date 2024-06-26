using System;
using System.Collections.Generic;
using RecAPI.Users.Models;

namespace RecAPI.Users.Repositories
{
    public interface IUserRepository
    {
        List<User> GetUsers();
        List<User> GetApprovedUsers();
        List<User> GetAllUsersNotApproved();
        List<User> GetUsers(List<string> ids);
        List<User> GetUsersByEmail(List<string> email);
        User GetUser(string id);
        User GetUserByEmail(string email);
        User GetUserByAuth(string authId);
        List<User> GetAllUsersExceptByAuth(List<string> authIds);

        List<User> GetAllAvailableUsers(DateTime date);
        bool CheckUserAvailable(string id, DateTime date);

        User CreateUser(User user);
        User UpdateUser(string id, User updatedUser);
        bool DeleteUser(string id);
    }
}