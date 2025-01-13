using API.DTOs.Tasks;
using API.Infrastructure;
using API.Models;

namespace API.Interfaces;

public interface ITaskRepository
{
    public Task<Result<TaskItem>> CreateAsync(CreateDto create);
    public Task<Result<TaskItem>> UpdateAsync(UpdateDto update);    
    public Task<Result<IEnumerable<TaskItem>>> GetAllTasksAsync();
    public Task<Result<int>> RemoveTaskAsync(int taskId);
}
