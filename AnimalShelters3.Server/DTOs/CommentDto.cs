

namespace AnimalShelters3.Server.DTOs
{
    public class CommentDto
    {
        public long Id { get; set; }
        public long? PostId { get; set; }
        public int? UserId { get; set; }
        public string? Content { get; set; }
        public string? UserName { get; set; } // اسم المستخدم

        public List<ReplyDto>? Replies { get; set; }
        public int LikesCount { get; set; } // Count of likes
    }

}
