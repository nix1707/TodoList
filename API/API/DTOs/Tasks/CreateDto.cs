using API.Models;

namespace API.DTOs.Tasks;

public class CreateDto
{
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime Deadline { get; set; }
    public TaskPriority Priority { get; set; }
}
