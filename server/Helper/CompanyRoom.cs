using server.Models;

namespace server.Helper
{
    public class CompanyRoom
    {
        public string Address { get; set; }
        public string CompanyName { get; set; }
        public List<Room> Rooms { get; set; }
    }
}
