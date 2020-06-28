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

        public IEnumerable<Position> GetPositions()
        {
            var data = _positions.Find(position => true).ToList();
            return data;
        }

        public Position GetPosition(string Id)
        {
            var data = _positions.Find<Position>(position => position.Id == Id).FirstOrDefault();
            return data;
        }

        
        public Position AddPosition(Position position)
        {
            _positions.InsertOne(position);
            return position;
        }

        public Position UpdatePosition(string Id, Position updatePosition)
        {
            _positions.ReplaceOne(position => position.Id == Id, updatePosition);
            return GetPosition(Id);
        }

        public bool DeletePosition(string id)
        {
            var actionResult =_positions.DeleteOne(position => position.Id == id);
            return actionResult.IsAcknowledged && actionResult.DeletedCount > 0;
        }
    }
}