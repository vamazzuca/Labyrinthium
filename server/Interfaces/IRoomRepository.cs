using server.Helper;
using server.Models;

namespace server.Interfaces
{
    public interface IRoomRepository
    {
        Task<ICollection<Room>> GetRooms();

        Task<Room> GetRoom(int roomId);

        bool RoomExists(int roomId);
        Task<List<CompanyRoom>> SearchRooms(string searchQuery, double latitude, double longitude);
    }
}
