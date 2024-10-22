

namespace AnimalShelters3.Server.DTOs
{
    public class PostDto
    {
        public int UserId { get; set; } // معرف المستخدم الذي أنشأ المنشور
        public string Content { get; set; } // محتوى المنشور
        public string Title { get; set; } // عنوان المنشور
        public string Tag { get; set; } // الوسوم الخاصة بالمنشور
        public IFormFile ImageFile { get; set; } // ملف الصورة المرفوع
    }
}
