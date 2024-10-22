namespace AnimalShelters3.Server.DTOs
{
    public class UserProfileDto
    {

        public string UserName { get; set; } = null!;

        public string Email { get; set; } = null!;
        public IFormFile? Image { get; set; }

        public string? Description { get; set; }

        public int? UserAge { get; set; }

        public string? UserAdderss { get; set; }


    }
}
