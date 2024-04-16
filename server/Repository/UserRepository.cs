using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Interfaces;
using server.Models;

namespace server.Repository
{
    public class UserRepository : IUserRepository
    {
       
        private readonly UserManager<User> _userManager;

        public UserRepository(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public async Task<User> GetUserByUsername(string username)
        {
            return await _userManager.FindByNameAsync(username);
        }

        public async Task<User> UpdateUser(string id, string username, string name, string photo, string bio, string location)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
                return null;

            user.UserName = username;
            user.Name = name;
            user.Photo = photo;
            user.Bio = bio;
            user.Location = location;

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                throw new ApplicationException("Failed to update user.");
            }

            return user;
        }


    }
}
