using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace RecAPI.Models
{
    public class Section
    {
        public Section(
            string name,
            string description
        )
        {
            Name = name;
            Description = description;
        }
        public Section(
            string id,
            string name,
            string description
        )
        {
            Id = id;
            Name = name;
            Description = description;
        }
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<Position> Positions { get; }
        public List<Team> Teams { get; }
    }
}