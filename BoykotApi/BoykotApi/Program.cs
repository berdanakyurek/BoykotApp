using Microsoft.EntityFrameworkCore;
using Boykot.DbContexts;
using Boykot.Services;
using Boykot.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});


builder.Services.AddDbContext<BoykotDbContext>(options => {
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    var Server = builder.Configuration["DbCredentials:Server"];
    var Port = builder.Configuration["DbCredentials:Port"];
    var DB = builder.Configuration["DbCredentials:DB"];
    var Username = builder.Configuration["DbCredentials:Username"];
    var Password = builder.Configuration["DbCredentials:Password"];
    options.UseNpgsql($"Server={Server};Port={Port};Database={DB};Username={Username};Password={Password};Include Error Detail=true");
 });

builder.Services.AddScoped<IBoykotService, BoykotService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.Run();
