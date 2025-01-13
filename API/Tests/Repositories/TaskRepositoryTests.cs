using API.Database;
using API.DTOs.Tasks;
using API.Infrastructure.Repository;
using API.Models;
using Tests.Helpers;

namespace Tests.Repositories;

public class TaskRepositoryTests : IDisposable
{
    private readonly AppDbContext _context;
    private readonly TaskRepository _repository;

    public TaskRepositoryTests()
    {
        _context = TestHelper.CreateTestDbContext();
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
    }

    public void Dispose()
    {
        _context.Database.EnsureDeleted();
        _context.Dispose();
    }
}