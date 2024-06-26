using System;
using System.Linq;
using System.Collections.Generic;
using RecAPI.Positions.Models;
using RecAPI.Database;

using MongoDB.Driver;

namespace RecAPI.Positions.Repositories
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
        public IEnumerable<Position> GetPositions(List<string> ids)
        {
            var data = _positions.Find(position => ids.Contains(position.Id)).ToList();
            return data;
        }
        public IEnumerable<Position> GetPositionsByAdmisionPeriode(string admisionPeriodeId)
        {
            return _positions.Find(position => position.AdmisionPeriode == admisionPeriodeId).ToList();
        }
        public IEnumerable<Position> GetTeamPositions(string teamId)
        {
            return _positions.Find(position => position.Team == teamId).ToList();
        }
        public IEnumerable<Position> GetSectionPositions(string sectionId)
        {
            return _positions.Find(position => position.Section == sectionId).ToList();
        }
        public Position GetPosition(string Id)
        {
            var data = _positions.Find<Position>(position => position.Id == Id).FirstOrDefault();
            return data;
        }
        public Position GetPositionByName(string name)
        {
            var data = _positions.Find<Position>(position => position.Name == name).FirstOrDefault();
            return data;
        }
        public Position AddPosition(Position position)
        {
            _positions.InsertOne(position);
            return GetPosition(position.Id);
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