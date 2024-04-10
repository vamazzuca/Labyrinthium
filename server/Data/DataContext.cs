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

        public DbSet<room> Rooms { get; set; }
    }
}
