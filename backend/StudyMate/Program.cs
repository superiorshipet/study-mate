using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using StudyMate.Interfaces;
using StudyMate.Data;
using StudyMate.Repositories;
using StudyMate.Services;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Force Development environment for now
builder.Environment.EnvironmentName = "Development";

// Add services to the container.
builder.Services.AddControllers();

// Configure Database
try
{
    builder.Services.AddDbContext<StudyMateDbContext>(options =>
        options.UseSqlServer(
            builder.Configuration.GetConnectionString("DefaultConnection"),
            sqlOptions => sqlOptions.EnableRetryOnFailure(5, TimeSpan.FromSeconds(10), null)));
}
catch (Exception ex)
{
    Console.WriteLine($"Database configuration error: {ex.Message}");
}

// Configure JWT Authentication
var jwtKey = builder.Configuration["Jwt:Key"] ?? "YourSecretKeyHere12345678901234567890";
var jwtIssuer = builder.Configuration["Jwt:Issuer"] ?? "StudyMate";
var jwtAudience = builder.Configuration["Jwt:Audience"] ?? "StudyMate";

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtIssuer,
            ValidAudience = jwtAudience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
        };
    });

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:3000", "https://localhost:3000", "https://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

// Register Repositories
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ICourseRepository, CourseRepository>();
builder.Services.AddScoped<IVideoRepository, VideoRepository>();
builder.Services.AddScoped<IPaymentRepository, PaymentRepository>();
builder.Services.AddScoped<IEnrollmentRepository, EnrollmentRepository>();

// Register Payment Service
builder.Services.AddScoped<IPaymentService, StripePaymentService>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "StudyMate API", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

var app = builder.Build();

Console.WriteLine("StudyMate API starting...");
Console.WriteLine($"Environment: {app.Environment.EnvironmentName}");

// Initialize database
try
{
    Console.WriteLine("Initializing database...");
    using (var scope = app.Services.CreateScope())
    {
        var db = scope.ServiceProvider.GetRequiredService<StudyMateDbContext>();
        try
        {
            // Ensure the database exists
            db.Database.EnsureCreated();
            Console.WriteLine("Database is ready");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Database initialization warning: {ex.Message}");
        }
    }
}
catch (Exception ex)
{
    Console.WriteLine($"Database initialization error: {ex.Message}");
}

// Configure the HTTP request pipeline.
Console.WriteLine("Configuring Swagger...");
app.UseSwagger();
app.UseSwaggerUI();

Console.WriteLine("CORS policy enabled");
app.UseCors("AllowReactApp");

// Handle CORS preflight requests
app.Use(async (context, next) =>
{
    if (context.Request.Method == "OPTIONS")
    {
        context.Response.Headers.Add("Access-Control-Allow-Origin", context.Request.Headers["Origin"].ToString() ?? "*");
        context.Response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        context.Response.Headers.Add("Access-Control-Allow-Headers", "Content-Type, Authorization");
        context.Response.StatusCode = 200;
        return;
    }
    await next(context);
});

Console.WriteLine("Authentication and Authorization configured");
app.UseAuthentication();
app.UseAuthorization();

Console.WriteLine("Mapping controllers");
app.MapControllers();

Console.WriteLine("Starting to listen on configured ports...");
try
{
    app.Run();
}
catch (Exception ex)
{
    Console.WriteLine($"Application error: {ex.Message}");
    Console.WriteLine($"Stack trace: {ex.StackTrace}");
}
