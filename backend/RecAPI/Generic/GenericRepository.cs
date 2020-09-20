using MongoDB.Driver;
using RecAPI.Auth.Models;
using RecAPI.Database;
using RecAPI.Users.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace RecAPI.Generic
{
    public class GenericRepository : IGenericRepository
    {
        private readonly IMongoDatabase _database;
        private readonly IRecWebCollectionNameSettings _collectionNames;
        public GenericRepository(IRecWebDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            _database = client.GetDatabase(settings.DatabaseName);
            _collectionNames = settings;
        }

        public void purgeDatabase()
        {
            foreach(PropertyInfo pi in _collectionNames.GetType().GetProperties())
            {
                var name = pi.GetValue(_collectionNames);
                if (! new string[] { "Users", "AuthCredentials", "Teams", "Sections", "Organizations" }.Contains(name.ToString())) {
                    _database.DropCollectionAsync(name.ToString()).GetAwaiter().GetResult();
                } else
                {
                    if (name.ToString() == "Users")
                    {
                        var _collection = _database.GetCollection<User>(name.ToString());
                        _collection.DeleteManyAsync(x => !x.Email.Contains("isfit")).GetAwaiter().GetResult();
                    }
                    else if (name.ToString() == "AuthCredentials")
                    {
                        var _collection = _database.GetCollection<AuthUser>(name.ToString());
                        _collection.DeleteManyAsync(x => !x.Email.Contains("isfit")).GetAwaiter().GetResult();
                    }
                }
            }
        }
    }
}
