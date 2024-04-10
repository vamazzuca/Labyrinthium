namespace server.Models
{
    public class User
    {

        public int Id { get; set; }

        public ICollection<UserRoom>? UserRooms { get; set; }

    }
}
