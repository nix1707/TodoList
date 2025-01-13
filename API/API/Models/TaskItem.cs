namespace API.Models;

public class TaskItem
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime Deadline { get; set; }
    public bool IsCompleted { get; set; }
    public TaskPriority Priority { get; set; } = TaskPriority.Medium;
}