namespace AnimalShelters3.Server.DTOs
{
    public class ShelterDTO
    {
        public string Name { get; set; } = null!;

        public string? Address { get; set; }

        public string? Phone { get; set; }

        public string Email { get; set; } = null!;

        public bool? Verified { get; set; }

        public DateTime? CreatedAt { get; set; }
    }
}
