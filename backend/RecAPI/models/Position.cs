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
        public string Id { get; set; }
        [BsonElement("Name")]
        public string Name { get; set; }
        [BsonElement("Description")]
        public string Description { get; set; }
    }
}