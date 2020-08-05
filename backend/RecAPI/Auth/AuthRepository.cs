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

        public bool RegisterUser(AuthUser authUser)
        {
            _authUsers.InsertOne(authUser);
            var createdUser = GetAuthUser(authUser.Id);
            return authUser == createdUser;
        }
        public AuthUser GetAuthUserByEmail(string email)
        {
            var authUser = _authUsers.Find(user => user.Email == email).FirstOrDefault();
            return authUser;
        }
    }
}