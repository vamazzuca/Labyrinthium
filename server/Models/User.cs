using Microsoft.AspNetCore.Identity;

namespace server.Models
{
    public class User : IdentityUser
    {

        public string? Name { get; set; }

        public string? Bio { get; set; }

        public string? Location { get; set; }

        public string? Photo { get; set; }

        public ICollection<UserRoom>? UserRooms { get; set; }

    }
}
