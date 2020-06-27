using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace RecAPI.Models
{
    public class Position
    {
        /*
        public Position(
            int id,
            string name,
            string description
        )
        {
            Id = id;
            Name = name;
            Description = description;
        }
        */
        
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}