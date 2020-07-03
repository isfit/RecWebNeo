using System;
using System.Linq;
using System.Collections.Generic;
using RecAPI.Models;
using RecAPI.Database;
using MongoDB.Driver;
using MongoDB.Bson;

namespace RecAPI.Repositories
{
    public class SectionRepository : ISectionRepository
    {
        private readonly IMongoCollection<Section> _sections;
        public SectionRepository(IRecWebDatabaseSettings settings) {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _sections = database.GetCollection<Section>(settings.SectionCollectionName);
        }
        public IEnumerable<Section> GetSections() {
            return _sections.Find(section => true).ToList();
        }
        public IEnumerable<Section> GetSections(List<string> ids) {
            return _sections.Find(section => ids.Contains(section.Id)).ToList();
        }
        public Section GetSection(string id) {
            return _sections.Find(section => section.Id == id).FirstOrDefault();
        }
        public Section AddSection(Section section) {
            _sections.InsertOne(section);
            return GetSection(section.Id);
        }
        public Section UpdateSection(string id, Section updateSection) {
            _sections.ReplaceOne(team => team.Id == id, updateSection);
            return GetSection(id);
        }
        public bool DeleteSection(string id) {
            var actionResult =_sections.DeleteOne(section => section.Id == id);
            return actionResult.IsAcknowledged && actionResult.DeletedCount > 0;
        }
    }
}