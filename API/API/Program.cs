using API.Infrastructure.Repository;
using API.Interfaces;
using API.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(opt =>
{
    opt.AddDefaultPolicy(policy =>
    {
        policy
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials()
            .WithOrigins("http://localhost:3000");
    });
});

builder.Services.AddMongoDbContext(builder.Configuration);
builder.Services.AddScoped<ITaskRepository, TaskRepository>();
builder.Services.AddControllers();

var app = builder.Build();

app.UseCors();
app.UseAuthorization();
app.MapControllers();
app.Run();
