using API.Database;
using API.DTOs.Tasks;
using API.Interfaces;
using API.Models;
using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Text.Json;

namespace API.Infrastructure.Repository;

public class TaskRepository(AppDbContext context) : ITaskRepository
{
    private readonly AppDbContext _context = context;

    public async Task<Result<TaskItem>> CreateAsync(CreateDto create)
    {
        var taskItem = new TaskItem
        {
            Id = ObjectId.GenerateNewId().ToString(),
            Title = create.Title,
            Description = create.Description,
            CreatedAt = DateTime.Now,
            Deadline = create.Deadline,
            Priority = create.Priority,
            IsCompleted = false
        };

        await _context.TaskItems.AddAsync(taskItem);

        var success = await _context.SaveChangesAsync() > 0;

        if (success)
            return Result<TaskItem>.Success(taskItem);

        return Result<TaskItem>.Failure("Failed to create Task");
    }

    public async Task<Result<IEnumerable<TaskItem>>> GetAllTasksAsync()
    {
        var tasks = await _context.TaskItems.AsNoTracking().ToListAsync();
        return Result<IEnumerable<TaskItem>>.Success(tasks);
    }

    public async Task<Result<string>> RemoveTaskAsync(string taskId)
    {
        var taskItem = await _context.TaskItems.FirstOrDefaultAsync(i => i.Id == taskId);

        if (taskItem is null) return null;

        _context.TaskItems.Remove(taskItem);

        var success = await _context.SaveChangesAsync() > 0;

        if (success) return Result<string>.Success(taskId);

        return Result<string>.Failure("Failed to remove Task");

    }

    public async Task<Result<TaskItem>> UpdateAsync(UpdateDto update)
    {
        var taskItem = await _context.TaskItems.FirstOrDefaultAsync(i => i.Id == update.Id);

        if (taskItem is null) return null;

        taskItem.Title = update.Title;
        taskItem.Description = update.Description;
        taskItem.IsCompleted = update.IsCompleted;
        taskItem.Priority = update.Priority;

        var succes = await _context.SaveChangesAsync() > 0;

        if (succes) return Result<TaskItem>.Success(taskItem);

        return Result<TaskItem>.Failure("Failed to update Task");
    }

}
