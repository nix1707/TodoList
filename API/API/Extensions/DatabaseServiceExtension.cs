using API.Database;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;

namespace API.Extensions;

public static class DatabaseServiceExtension
{
    public static IServiceCollection AddMongoDbContext(this IServiceCollection services, IConfiguration config)
    {
        var configSection = config.GetRequiredSection("MongoDbConfiguration");
        var connectionString = configSection["ConnectionString"];
        var databaseName = configSection["DatabaseName"];

        services.AddDbContext<AppDbContext>(options =>
            options.UseMongoDB(new MongoClient(connectionString), databaseName)
        );

        return services;
    }
}