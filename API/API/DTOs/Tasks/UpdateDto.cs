using API.Models;

namespace API.DTOs.Tasks;

public class UpdateDto
{
    public string Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public bool IsCompleted { get; set; }
    public TaskPriority Priority { get; set; }

}
