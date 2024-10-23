namespace AnimalShelters3.Server.DTOs
{
    public class ContactRequest
    {
        public string Name { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string Message { get; set; } = null!;

        public int? PhoneNum { get; set; }

    }
}
