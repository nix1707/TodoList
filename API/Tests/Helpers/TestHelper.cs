using API.Database;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace Tests.Helpers;

public static class TestHelper
{
    public static AppDbContext CreateTestDbContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        return new AppDbContext(options);
    }

    public static TaskItem CreateTestTask()
    {
        return new TaskItem
        {
            Id = 1,
            Title = "Test Task",
            Description = "Test Description",
            CreatedAt = DateTime.Now,
            Deadline = DateTime.Now.AddDays(1),
            Priority = TaskPriority.Medium,
            IsCompleted = false
        };
    }
}