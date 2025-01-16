using API.Database;
using API.Models;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using Mongo2Go;
using MongoDB.Bson;

namespace Tests.Helpers;

public static class TestHelper
{
    public static AppDbContext CreateTestDbContext()
    {
        var runner = MongoDbRunner.Start();

        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseMongoDB(runner.ConnectionString, "TestDb")
            .Options;

        return new AppDbContext(options);
    }

    public static TaskItem CreateTestTask()
    {
        return new TaskItem
        {
            Id = ObjectId.GenerateNewId().ToString(),
            Title = "Test Task",
            Description = "Test Description",
            CreatedAt = DateTime.Now,
            Deadline = DateTime.Now.AddDays(1),
            Priority = TaskPriority.Medium,
            IsCompleted = false
        };
    }
}

public class TestBase : IDisposable
{
    protected readonly MongoDbRunner _runner;
    protected readonly AppDbContext _context;

    public TestBase()
    {
        _runner = MongoDbRunner.Start();
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseMongoDB(_runner.ConnectionString, "TestDb")
            .Options;
        _context = new AppDbContext(options);
    }

    public void Dispose()
    {
        _context.Dispose();
        _runner.Dispose();
    }
}