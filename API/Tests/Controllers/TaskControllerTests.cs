using API.Controllers;
using API.DTOs.Tasks;
using API.Infrastructure;
using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Tests.Helpers;

namespace Tests.Controllers;

public class TasksControllerTests
{
    private readonly Mock<ITaskRepository> _mockRepository;
    private readonly TasksController _controller;

    public TasksControllerTests()
    {
        _mockRepository = new Mock<ITaskRepository>();
        _controller = new TasksController(_mockRepository.Object);
    }

    [Fact]
    public async Task Create_ValidTask_ReturnsCreatedTask()
    {
        var createDto = new CreateDto
        {
            Title = "Test Task",
            Description = "Test Description",
            Deadline = DateTime.Now.AddDays(1),
            Priority = TaskPriority.Medium
        };

        var expectedTask = TestHelper.CreateTestTask();
        _mockRepository.Setup(repo => repo.CreateAsync(createDto))
            .ReturnsAsync(Result<TaskItem>.Success(expectedTask));

        var result = await _controller.Create(createDto);

        var actionResult = Assert.IsType<ActionResult<TaskItem>>(result);
        var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
        var returnedTask = Assert.IsType<TaskItem>(okResult.Value);
        Assert.Equal(expectedTask.Title, returnedTask.Title);
    }

    [Fact]
    public async Task GetAllTasks_ReturnsAllTasks()
    {
        var expectedTasks = new List<TaskItem> { TestHelper.CreateTestTask() };
        _mockRepository.Setup(repo => repo.GetAllTasksAsync())
            .ReturnsAsync(Result<IEnumerable<TaskItem>>.Success(expectedTasks));

        var result = await _controller.GetAllTasks();

        var actionResult = Assert.IsType<ActionResult<IEnumerable<TaskItem>>>(result);
        var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
        var tasks = Assert.IsAssignableFrom<IEnumerable<TaskItem>>(okResult.Value);
        Assert.Single(tasks);
    }

    [Fact]
    public async Task DeleteTask_ExistingTask_ReturnsNoContent()
    {
        var taskId = 1;
        _mockRepository.Setup(repo => repo.RemoveTaskAsync(taskId))
            .ReturnsAsync(Result<int>.Success(taskId));

        var result = await _controller.DeleteTask(taskId);

        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal(taskId, okResult.Value);
    }

    [Fact]
    public async Task UpdateTask_ValidUpdate_ReturnsUpdatedTask()
    {
        var updateDto = new UpdateDto
        {
            Id = 1,
            Title = "Updated Title",
            Description = "Updated Description",
            IsCompleted = true
        };

        var updatedTask = TestHelper.CreateTestTask();
        updatedTask.Title = updateDto.Title;
        updatedTask.Description = updateDto.Description;
        updatedTask.IsCompleted = updateDto.IsCompleted;

        _mockRepository.Setup(repo => repo.UpdateAsync(updateDto))
            .ReturnsAsync(Result<TaskItem>.Success(updatedTask));

        var result = await _controller.UpdateTask(updateDto);

        var actionResult = Assert.IsType<ActionResult<TaskItem>>(result);
        var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
        var returnedTask = Assert.IsType<TaskItem>(okResult.Value);
        Assert.Equal(updateDto.Title, returnedTask.Title);
    }
}