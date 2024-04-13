namespace server.Dto
{
    public class UserUpdateRequest
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        public string Photo { get; set; }
        public string Bio { get; set; }
        public string Location { get; set; }
    }
}
