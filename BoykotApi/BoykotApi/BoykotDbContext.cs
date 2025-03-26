using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using Microsoft.Extensions.Configuration;
using Boykot.Models.Db;

namespace Boykot.DbContexts
{
    public class BoykotDbContext : DbContext
    {
        private readonly IConfiguration _configuration;

        public BoykotDbContext(DbContextOptions<BoykotDbContext> options, IConfiguration configuration): base(options) {
            _configuration = configuration;
        }
        // DB tables
        public DbSet<Company> Companies { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<CompanyTag> CompanyTags { get; set; }
        public DbSet<BarcodePrefix> BarcodePrefixes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

            if (!optionsBuilder.IsConfigured)
            {
                var Server = _configuration["DbCredentials:Server"];
                var Port = _configuration["DbCredentials:Port"];
                var DB = _configuration["DbCredentials:DB"];
                var Username = _configuration["DbCredentials:Username"];
                var Password = _configuration["DbCredentials:Password"];
                optionsBuilder.UseNpgsql($"Server={Server};Port={Port};Database={DB};Username={Username};Password={Password};Include Error Detail=true");
            }

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            # region Company
            modelBuilder.Entity<Company>()
                .HasKey(b => b.Id);
            modelBuilder.Entity<Company>()
                .Property(b => b.Id)
                .ValueGeneratedOnAdd();
            #endregion

            # region Tag
            modelBuilder.Entity<Tag>()
                .HasKey(b => b.Id);
            modelBuilder.Entity<Tag>()
                .Property(b => b.Id)
                .ValueGeneratedOnAdd();
            #endregion

            # region CompanyTag
            modelBuilder.Entity<CompanyTag>()
                .HasKey(b => b.Id);
            modelBuilder.Entity<CompanyTag>()
                .Property(b => b.Id)
                .ValueGeneratedOnAdd();
            modelBuilder.Entity<CompanyTag>()
                .HasOne(e => e.Company)
                .WithMany(e => e.CompanyTags)
                .HasForeignKey(e => e.CompanyId);
            modelBuilder.Entity<CompanyTag>()
                .HasOne(e => e.Tag)
                .WithMany(e => e.CompanyTags)
                .HasForeignKey(e => e.TagId);
            #endregion

            # region BarcodePrefix
            modelBuilder.Entity<BarcodePrefix>()
                .HasKey(b => b.Id);
            modelBuilder.Entity<BarcodePrefix>()
                .Property(b => b.Id)
                .ValueGeneratedOnAdd();
            modelBuilder.Entity<BarcodePrefix>()
                .HasOne(e => e.Company)
                .WithMany(e => e.BarcodePrefixes)
                .HasForeignKey(e => e.CompanyId);
            #endregion
        }
    }
}
