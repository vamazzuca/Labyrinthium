using server.Models;

namespace server.Interfaces
{
    public interface IRoomRepository
    {
        ICollection<Room> GetRooms();

        Task<IEnumerable<Room>> SearchRooms(string searchQuery, double latitude, double longitude);
    }
}
