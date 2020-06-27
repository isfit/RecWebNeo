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
            Console.WriteLine(database);
            Console.WriteLine(settings.PositionCollectionName);
            _positions = database.GetCollection<Position>(settings.PositionCollectionName);
            Console.WriteLine("Hello there");
        }

        public void AddPosition(string Name, string Description)
        {
            // Do nothing for now
            Console.WriteLine("Hello there");
        }

        public IEnumerable<Position> GetPositions()
        {
            /*
            var positions = new List<Position>();
            var pos_1 = new Position(
                1,
                "Test name",
                "Test description"
            );
            positions.Add(pos_1);
            var pos_2 = new Position(
                2,
                "Test name 2",
                "Test description 2"
            );
            positions.Add(pos_2);
            return positions;
            */
            Console.WriteLine("Asks for positions");
            return _positions.Find(position => true).ToList();
        }

        public string GetGreat()
        {
            return "Greatings young padawan";
        }
    }
}