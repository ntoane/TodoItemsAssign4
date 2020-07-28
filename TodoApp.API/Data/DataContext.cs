using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TodoApp.API.Models;

namespace TodoApp.API.Data
{
    public class DataContext : IdentityDbContext<IdentityUser>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<TodoItem> TodoItems { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            // Fluent API implementation
            base.OnModelCreating(builder);
            // Set Primary Key for users table as UserName
            builder.Entity<IdentityUser>().HasKey(u => new { u.UserName });
            // Remove Id from table on creation as it won't be used
            builder.Entity<IdentityUser>().Ignore(u => u.Id);
            // Set UserName as Foreign Key in TodoItems table
            builder.Entity<TodoItem>().HasOne(typeof(IdentityUser))
                .WithMany()
                .HasForeignKey("UserName");
        }
    }
}