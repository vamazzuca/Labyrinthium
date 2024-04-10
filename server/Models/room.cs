namespace server.Models
{
    public class Room
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Company { get; set; }

        public int MinParty { get; set; }

        public int MaxParty { get; set; }

        public string Time { get; set; }

        public string? ScareLevel { get; set; }


        public string Description { get; set; }

        public string AltImage { get; set; }

        public string Address { get; set; }

        public string Phone { get; set; }

        public string? AgeRequirement { get; set; }

        public string Website { get; set; }

        public string Difficulty { get; set; }

        public double Latitude { get; set; }

        public double Longitude { get; set; }

        public string Image { get; set; }

        public ICollection<UserRoom>? UserRooms { get; set; }
        







    }
}
