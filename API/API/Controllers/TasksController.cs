using API.DTOs.Tasks;
using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class TasksController(ITaskRepository repository) : BaseApiController
{
    private readonly ITaskRepository _repository = repository;

    [HttpPost]
    public async Task<ActionResult<TaskItem>> Create(CreateDto create)
    {
        return HandleResult(await _repository.CreateAsync(create));
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskItem>>> GetAllTasks()
    {
        return HandleResult(await _repository.GetAllTasksAsync());
    }

    [HttpPut]
    public async Task<ActionResult<TaskItem>> UpdateTask(UpdateDto update)
    {
        return HandleResult(await _repository.UpdateAsync(update));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(string id)
    {
        return HandleResult(await _repository.RemoveTaskAsync(id));
    }

}
