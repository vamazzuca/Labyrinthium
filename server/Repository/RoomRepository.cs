using GeoCoordinatePortable;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Helper;
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

        public async Task<ICollection<Room>> GetRooms()
        {
            return await _context.Rooms.OrderBy(p => p.Id).ToListAsync();
        }
        
        public async Task<Room> GetRoom(int id)
        {
            return await _context.Rooms.Where(p => p.Id == id).FirstOrDefaultAsync();
        }

        public async Task<List<CompanyRoom>> SearchRooms(string searchQuery, double latitude, double longitude)
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

            var sortedRooms = filteredRoomsEnumerable
                .OrderBy(room =>
                    new GeoCoordinate(room.Latitude, room.Longitude)
                        .GetDistanceTo(userLocation)
            );


            var groupedRooms = sortedRooms
                .Where(room => room.Company != null)
                .GroupBy(room => new { room.Address, room.Company })
                .Select(group => new CompanyRoom
                {
                     Address = group.Key.Address,
                     CompanyName = group.Key.Company,
                     Rooms = group.ToList()
                }).ToList();



            return groupedRooms;


        }

        public async Task MarkRoomAsCompleted(string userId, int roomId)
        {
            var userRoom = await _context.UserRooms
                .FirstOrDefaultAsync(ur => ur.UserId == userId && ur.EscapeRoomId == roomId);

            if (userRoom == null)
            {
                userRoom = new UserRoom
                {
                    UserId = userId,
                    EscapeRoomId = roomId,
                    DateTime = DateTime.Now 
                };
                _context.UserRooms.Add(userRoom);
            }
            

            await _context.SaveChangesAsync();
        }

        public async Task UnmarkRoomAsCompleted(string userId, int roomId)
        {
            var userRoom = await _context.UserRooms
                .FirstOrDefaultAsync(ur => ur.UserId == userId && ur.EscapeRoomId == roomId);

            if (userRoom != null)
            {
                _context.UserRooms.Remove(userRoom);
                await _context.SaveChangesAsync();
            }
        }


        public async Task<bool> IsRoomCompleted(string userId, int roomId)
        {
            return await _context.UserRooms
                .AnyAsync(ur => ur.UserId == userId && ur.EscapeRoomId == roomId);
        }

       

        public bool RoomExists(int roomId)
        {
           return _context.Rooms.Any(p => p.Id == roomId);
        }

        public async Task<List<Room>> GetCompletedRoomsByUser(string userId)
        {
            var completedRoomIds = await _context.UserRooms
                .Where(ur => ur.UserId == userId)
                .Select(ur => ur.EscapeRoomId)
                .ToListAsync();

            return await _context.Rooms
                .Where(room => completedRoomIds.Contains(room.Id))
                .ToListAsync();
        }
    }
}
