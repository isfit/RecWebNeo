using System;
using System.Linq;
using System.Collections.Generic;
using RecAPI.Models;
using RecAPI.Database;

using MongoDB.Driver;

namespace RecAPI.Repositories
{
    public class PositionRepository : IPositionRepository
    {
        private readonly IMongoCollection<Position> _positions;

        public PositionRepository(IRecWebDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _positions = database.GetCollection<Position>(settings.PositionCollectionName);
        }

        public void AddPosition(string Name, string Description)
        {
            // Create Position
        }

        public IEnumerable<Position> GetPositions()
        {
            var data = _positions.Find(position => true).ToList();
            foreach (Position d in data) {
                Console.WriteLine(d.Description);
            }
            return data;
        }
    }
}