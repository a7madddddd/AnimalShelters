namespace AnimalShelters3.Server.DTOs
{
    public class PostDto1
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; } // إضافة خاصية UserName

        public string Content { get; set; }
        public string Image { get; set; }
        public string Title { get; set; }
        public string Tag { get; set; }
        public int LikesCount { get; set; } // عدد الإعجابات
        public List<CommentDto> Comments { get; set; } // قائمة التعليقات
    }

}
