namespace AnimalShelters3.Server.DTOs
{
    public class ReplyDto
    {
        public long Id { get; set; }
        public long? CommentId { get; set; }
        public int? UserId { get; set; }
        public string? Image { get; set; }

        public string? Content { get; set; }
        public string? UserName { get; set; } // اسم المستخدم

    }

}
