namespace server.Models
{
    public class User
    {

        public int Id { get; set; }

        public string Name { get; set; }

        public string Username { get; set; }

        public string? Bio { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string? Location { get; set; }

        public string? Photo { get; set; }

        public ICollection<UserRoom>? UserRooms { get; set; }

    }
}
