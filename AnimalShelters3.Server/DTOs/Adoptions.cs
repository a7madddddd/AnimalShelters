namespace AnimalShelters3.Server.DTOs
{
    public class Adoptions
    {

        public int? UserId { get; set; }

        public int? AnimalId { get; set; }

        public string? Status { get; set; }

        public DateTime? SubmittedAt { get; set; }

        public string? Message { get; set; }
    }
}
