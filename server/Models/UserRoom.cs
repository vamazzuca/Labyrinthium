namespace server.Models
{
    public class UserRoom
    {
        
        public int UserId { get; set; }
        public int EscapeRoomId { get; set; }
        public DateTime? DateTime { get; set; }

        public User User { get; set; }
        public Room Room { get; set; }

    }
}
