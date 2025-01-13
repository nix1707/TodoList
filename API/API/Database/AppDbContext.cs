using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Database;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<TaskItem> TaskItems { get; set; }
}
