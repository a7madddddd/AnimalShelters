


namespace AnimalShelters3.Server.DTOs
{
    public class LikeDto
    {
        public long Id { get; set; }
        public long? PostId { get; set; }
        public long? CommentId { get; set; }
        public int? UserId { get; set; }
    }

}
