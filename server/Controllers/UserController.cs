using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using server.Dto;
using server.Interfaces;
using server.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly IUserRepository _userRepository;

        public UserController(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration, IUserRepository userRepository)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _userRepository = userRepository;

        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] SignUpRequest request)
        {
            if (request.Password != request.ConfirmPassword)
                return BadRequest(new { message = "Passwords do not match." });

            // Check if email is already in use
            var existingEmail = await _userManager.FindByEmailAsync(request.Email);
            if (existingEmail != null)
                return BadRequest(new { message = "Email already in use." });

            // Check if username is already in use
            var existingUsername = await _userManager.FindByNameAsync(request.Username);
            if (existingUsername != null)
                return BadRequest(new { message = "Username already in use." });

            var user = new User { UserName = request.Username, Email = request.Email, Name = request.Name};
           
            var result = await _userManager.CreateAsync(user, request.Password);
            if (!result.Succeeded)
            {
                var passwordErrors = result.Errors.Where(error => error.Code.StartsWith("Password"));
                if (passwordErrors.Any())
                {
                    
                    var errorMessages = passwordErrors.Select(error => error.Description);
                    return BadRequest(new { message = "Invalid signup request.", errors = errorMessages });
                }
                else
                {
                
                    return BadRequest(new { message = "Invalid signup request." });
                }
            }
            var token = GenerateJwtToken(user);
            var userDto = new UserDto { Email = user.Email, UserName = user.UserName, Name = user.Name };

            return Ok(new { user = userDto, token });
        }

        [HttpPost("signin")]
        public async Task<IActionResult> SignIn([FromBody] SignInRequest request)
        {
            var result = await _signInManager.PasswordSignInAsync(request.Email, request.Password, false, lockoutOnFailure: false);

            if (result.IsLockedOut)
            {
                return BadRequest(new { message = "Account is locked out." });
            }

            if (!result.Succeeded)
            {
                
                var emailCheck = await _userManager.FindByEmailAsync(request.Email);
                if (emailCheck == null)
                {
                    return NotFound(new { message = "User Not Found." });
                }
    
                return Unauthorized(new { message = "Incorrect password." });
            }

            var user = await _userManager.FindByEmailAsync(request.Email);
            var token = GenerateJwtToken(user);
            var userDto = new UserDto { Email = user.Email, UserName = user.UserName, Name = user.Name };

            return Ok(new { user = userDto, token });
        }

        [HttpGet("getUser")]
        public async Task<IActionResult> GetUser(string username)
        {
            
                var user = await _userRepository.GetUserByUsername(username);
                if (user == null)
                    return BadRequest(new { message = "Can't find User" });

                var result = new
                {
                    id = user.Id,
                    email = user.Email,
                    name = user.Name,
                    username = user.UserName,
                    photo = user.Photo,
                    bio =   user.Bio,
                    location = user.Location
                };

                return Ok(new { result });
            
            
        }

        [HttpPost("updateUser")]
        public async Task<IActionResult> UpdateUser([FromBody] UserUpdateRequest request)
        {
            
                var existingUser = await _userRepository.GetUserByUsername(request.Username);
                if (existingUser != null && existingUser.Id != request.Id)
                    return BadRequest(new { message = "Username already in use." });

                var updatedUser = await _userRepository.UpdateUser(request.Id, request.Username, request.Name, request.Photo, request.Bio, request.Location);
                if (updatedUser == null)
                    return NotFound(new { message = "User Not Found" });

                var result = new
                {
                    id = updatedUser.Id,
                    email = updatedUser.Email,
                    name = updatedUser.Name,
                    username = updatedUser.UserName,
                    photo = updatedUser.Photo,
                    bio = updatedUser.Bio,
                    location = updatedUser.Location
                };

                return Ok(result);
            
        }
        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("Jwt:Secret").Value));
            

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                new Claim("UserId", user.Id),
                new Claim(ClaimTypes.Email, user.Email),
                 
                }),
                Expires = DateTime.MaxValue,
                SigningCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256)
        };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
