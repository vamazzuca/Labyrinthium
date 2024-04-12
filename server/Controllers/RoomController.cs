using Microsoft.AspNetCore.Mvc;
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
        public IActionResult GetRooms() 
        { 
            var rooms = _roomRepository.GetRooms();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(rooms);
        }

        [HttpGet("search")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Room>))]
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
    }
}
