using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using System;
using System.Linq;
using System.IdentityModel.Tokens.Jwt;
using RecAPI.Auth.Models;
using RecAPI.Database;
using MongoDB.Driver;
using RecAPI.Auth.ErrorHandling;

namespace RecAPI.Auth.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly IMongoCollection<AuthUser> _authUsers;
        public AuthRepository(IRecWebDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _authUsers = database.GetCollection<AuthUser>(settings.AuthCollectionName);
        }

        public AuthUser GetAuthUser(string userId)
        {
            return _authUsers.Find(user => user.Id == userId).FirstOrDefault();
        }

        public string RegisterUser(AuthUser authUser)
        {
            _authUsers.InsertOne(authUser);
            var createdUser = GetAuthUser(authUser.Id);
            return createdUser?.Id;
        }
        public AuthUser GetAuthUserByEmail(string email)
        {
            var authUser = _authUsers.Find(user => user.Email == email).FirstOrDefault();
            return authUser;
        }

        // Clean the code!
        public bool SetRoleOfUser(string email, string role)
        {
            var availableRoles = new Dictionary<string, List<string>>()
            {
                { "superuser", new List<string>() { "internal", "admin", "superuser" } },
                { "admin", new List<string>() { "internal"} }
            };

            var user = GetAuthUserByEmail(email);
            if (user == null)
            {
                // Check if user exists
                AuthError.UserExistanceError();
            }
            var roles = user.Roles;
            Console.WriteLine(roles);
            if (roles != null && roles.Any( role => availableRoles.ContainsKey(role) && availableRoles[role].Contains(role) ))
            {
                var updateUserRole = user.SetRole(role);
                if (updateUserRole)
                {
                    _authUsers.FindOneAndReplace(u => u.Id == user.Id, user);
                    var updatedUser = GetAuthUserByEmail(email);
                    return updatedUser.Roles?.Contains(role) ?? false;
                }
            }
            return false;
        }
    }
}