using GeoCoordinatePortable;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Interfaces;
using server.Models;




namespace server.Repository
{
    public class RoomRepository : IRoomRepository
    {

        private readonly DataContext _context;

        public RoomRepository(DataContext context)
        {
            _context = context;

        }

        public ICollection<Room> GetRooms()
        {
            return _context.Rooms.OrderBy(p => p.Id).ToList();
        }

        public async Task<IEnumerable<Room>> SearchRooms(string searchQuery, double latitude, double longitude)
        {
            IQueryable<Room> filteredRooms = _context.Rooms;

            if (!string.IsNullOrEmpty(searchQuery))
            {
                filteredRooms = filteredRooms.Where(room =>
                    room.Name.Contains(searchQuery) ||
                    room.Company.Contains(searchQuery)
            );
            }

            var userLocation = new GeoCoordinate(latitude, longitude);

            var filteredRoomsList = await filteredRooms.ToListAsync();

            var filteredRoomsEnumerable = filteredRoomsList.AsEnumerable().Where(room =>
                new GeoCoordinate(room.Latitude, room.Longitude)
                    .GetDistanceTo(userLocation) <= 100000 // 100 km in meters
    );

            var groupedRooms = filteredRoomsEnumerable
                .Where(room => room.Company != null)
                .GroupBy(room => room.Company)
                .ToList();


            var flattenedRooms = groupedRooms.SelectMany(group => group);

            return flattenedRooms.ToList();


        }
    }
}
