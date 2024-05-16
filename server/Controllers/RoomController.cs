using Microsoft.AspNetCore.Mvc;
using server.Helper;
using server.Interfaces;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController : Controller
    {
        private readonly IRoomRepository _roomRepository;
        public RoomController(IRoomRepository roomRepository)
        {
            _roomRepository = roomRepository;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Room>))]
        public async Task<IActionResult> GetRooms() 
        { 
            var rooms = await _roomRepository.GetRooms();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(rooms);
        }

        [HttpGet("{roomId}")]
        [ProducesResponseType(200, Type = typeof(Room))]
        [ProducesResponseType(400)]
        public async Task<IActionResult> GetRoom(int roomId)
        {

            if (!_roomRepository.RoomExists(roomId))
                return NotFound();

            var room = await _roomRepository.GetRoom(roomId);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(room);
        }

        [HttpGet("search")]
        [ProducesResponseType(200, Type = typeof(List<CompanyRoom>))]
        public async Task<IActionResult> SearchRooms(double latitude, double longitude, string? query = null)
        {
           
            if (latitude == default || longitude == default)
            {
                ModelState.AddModelError("Coordinates", "Latitude and longitude are required.");
                return BadRequest(ModelState);
            }

            var rooms = await _roomRepository.SearchRooms(query, latitude, longitude);

            return Ok(rooms);
        }

        [HttpPost("markCompleted/{userId}/{roomId}")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> MarkRoomAsCompleted(string userId, int roomId)
        {
            await _roomRepository.MarkRoomAsCompleted(userId, roomId);
            return Ok();
        }

        [HttpPost("unmarkCompleted/{userId}/{roomId}")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> UnmarkRoomAsCompleted(string userId, int roomId)
        {
            await _roomRepository.UnmarkRoomAsCompleted(userId, roomId);
            return Ok();
        }

        [HttpGet("isCompleted/{userId}/{roomId}")]
        [ProducesResponseType(200, Type = typeof(bool))]
        public async Task<IActionResult> IsRoomCompleted(string userId, int roomId)
        {
            var isCompleted = await _roomRepository.IsRoomCompleted(userId, roomId);
            return Ok(isCompleted);
        }

        [HttpGet("completedRooms/{userId}")]
        [ProducesResponseType(200, Type = typeof(List<Room>))]
        public async Task<IActionResult> GetCompletedRoomsByUser(string userId)
        {
            var completedRooms = await _roomRepository.GetCompletedRoomsByUser(userId);
            return Ok(completedRooms);
        }
    }
}
