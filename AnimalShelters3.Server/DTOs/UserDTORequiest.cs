namespace AnimalShelters3.Server.DTOs
{
    public class UserDTORequiest
    {
        public string UserName { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string Password { get; set; } = null!;
        public byte[]? PasswordHash { get; set; }

        public byte[]? PasswordSalt { get; set; }


    }
}
