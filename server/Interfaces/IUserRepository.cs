using server.Models;

namespace server.Interfaces
{
    public interface IUserRepository
    {
        Task<User> GetUserByUsername(string username);
        Task<User> UpdateUser(string id, string username, string name, string photo, string bio, string location);
    }
}
