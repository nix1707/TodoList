using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace API.Models;

public class TaskItem
{
    [BsonId,BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    [BsonElement("title")]
    public string Title { get; set; }

    [BsonElement("description")]
    public string Description { get; set; }

    [BsonElement("createdAt")]
    public DateTime CreatedAt { get; set; }

    [BsonElement("deadline")]
    public DateTime Deadline { get; set; }

    [BsonElement("isCompleted")]
    public bool IsCompleted { get; set; }

    [BsonElement("priority")]
    public TaskPriority Priority { get; set; }
}