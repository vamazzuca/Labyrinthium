using Microsoft.EntityFrameworkCore;
using server.Models;
using System.ComponentModel;

namespace server.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            
        }

        public DbSet<Room> Rooms { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<UserRoom> UserRooms { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserRoom>()
                .HasKey(pc => new { pc.UserId, pc.EscapeRoomId });
            modelBuilder.Entity<UserRoom>()
                .HasOne(p => p.Room)
                .WithMany(pc => pc.UserRooms)
                .HasForeignKey(c => c.EscapeRoomId);
            modelBuilder.Entity<UserRoom>()
                .HasOne(p => p.User)
                .WithMany(pc => pc.UserRooms)
                .HasForeignKey(c => c.UserId);
        }
    }
}
