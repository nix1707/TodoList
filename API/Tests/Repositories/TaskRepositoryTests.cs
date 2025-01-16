using API.DTOs.Tasks;
using API.Infrastructure.Repository;
using API.Models;
using Microsoft.EntityFrameworkCore;
using Tests.Helpers;

namespace Tests.Repositories;

public class TaskRepositoryTests : TestBase
{
    private readonly TaskRepository _repository;

    public TaskRepositoryTests()
    {
        _repository = new TaskRepository(_context);
    }

    [Fact]
    public async Task CreateAsync_ValidTask_ReturnsSuccessResult()
    {
        var createDto = new CreateDto
        {
            Title = "Test Task",
            Description = "Test Description",
            Deadline = DateTime.Now.AddDays(1),
            Priority = TaskPriority.Medium,
        };

        var result = await _repository.CreateAsync(createDto);

        Assert.True(result.IsSuccess);
        Assert.NotNull(result.Value);
        Assert.Equal(createDto.Title, result.Value.Title);

        var savedTask = await _context.TaskItems.FindAsync(result.Value.Id);
        Assert.NotNull(savedTask);
    }

    [Fact]
    public async Task GetAllTasksAsync_WithExistingTasks_ReturnsAllTasks()
    {
        var testTask = TestHelper.CreateTestTask();
        await _context.TaskItems.AddAsync(testTask);
        await _context.SaveChangesAsync();

        var result = await _repository.GetAllTasksAsync();

        Assert.True(result.IsSuccess);
        Assert.Single(result.Value);

        var count = await _context.TaskItems.CountAsync();
        Assert.Equal(1, count);
    }

    [Fact]
    public async Task RemoveTaskAsync_ExistingTask_ReturnsSuccess()
    {
        var testTask = TestHelper.CreateTestTask();
        await _context.TaskItems.AddAsync(testTask);
        await _context.SaveChangesAsync();

        var result = await _repository.RemoveTaskAsync(testTask.Id);

        Assert.True(result.IsSuccess);
        Assert.Equal(testTask.Id, result.Value);

        var deletedTask = await _context.TaskItems.FindAsync(testTask.Id);
        Assert.Null(deletedTask);
    }

    [Fact]
    public async Task UpdateAsync_ExistingTask_ReturnsUpdatedTask()
    {
        var testTask = TestHelper.CreateTestTask();
        await _context.TaskItems.AddAsync(testTask);
        await _context.SaveChangesAsync();

        var updateDto = new UpdateDto
        {
            Id = testTask.Id,
            Title = "Updated Title",
            Description = "Updated Description",
            IsCompleted = true,
            Priority = TaskPriority.High
        };

        var result = await _repository.UpdateAsync(updateDto);

        Assert.True(result.IsSuccess);
        Assert.Equal(updateDto.Title, result.Value.Title);
        Assert.Equal(updateDto.Description, result.Value.Description);
        Assert.Equal(updateDto.Priority, result.Value.Priority);
        Assert.True(result.Value.IsCompleted);

        var updatedTask = await _context.TaskItems.FindAsync(testTask.Id);
        Assert.NotNull(updatedTask);
        Assert.Equal(updateDto.Title, updatedTask.Title);
    }
}