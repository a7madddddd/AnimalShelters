


using AnimalShelters3.Server.DTOs;
using AnimalShelters3.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace AnimalShelters3.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommunityController : ControllerBase
    {
        private readonly MyDbContext _context;

        public CommunityController(MyDbContext context)
        {
            _context = context;
        }
        [HttpPost("createPost")]
        public async Task<IActionResult> CreatePost([FromForm] PostDto postDto)
        {
            string fileName = null; // Declare fileName outside the if block

            // التحقق من وجود الصورة وحجمها
            if (postDto.ImageFile != null && postDto.ImageFile.Length > 0)
            {
                // التأكد من مجلد الصور
                var imagesPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");
                if (!Directory.Exists(imagesPath))
                {
                    Directory.CreateDirectory(imagesPath);
                }

                // إنشاء اسم فريد للملف باستخدام GUID
                fileName = $"{Guid.NewGuid()}{Path.GetExtension(postDto.ImageFile.FileName)}";
                var filePath = Path.Combine(imagesPath, fileName);

                // حفظ الملف في المسار المحدد
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await postDto.ImageFile.CopyToAsync(stream);
                }
            }

            // إضافة باقي بيانات المنشور إلى قاعدة البيانات
            var post = new Post
            {
                UserId = postDto.UserId,
                Content = postDto.Content,
                Title = postDto.Title,
                Tag = postDto.Tag,
                Image = fileName // استخدام اسم الصورة الذي تم إنشاؤه
            };

            _context.Posts.Add(post);
            await _context.SaveChangesAsync();

            return Ok(post);
        }



        [HttpGet("getImage/{imageName}")]
        public IActionResult GetImage(string imageName)
        {
            var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", imageName);

            if (System.IO.File.Exists(imagePath))
            {
                return PhysicalFile(imagePath, "image/jpeg"); // أو "image/png" حسب نوع الصورة
            }

            return NotFound();
        }
        [HttpGet("getAllPosts")]
        public async Task<IActionResult> GetAllPosts()
        {
            try
            {
                var posts = await _context.Posts
                    .Include(p => p.User)
                    .Include(p => p.Comments)
                        .ThenInclude(c => c.Replies)
                    .Include(p => p.Likes)
                    .ToListAsync();

                if (posts == null || !posts.Any())
                {
                    return NotFound("No posts found.");
                }

                var postDtos = posts.Select(post => new PostDto1
                {
                    Id = (int)post.Id,
                    UserId = (int)post.UserId,
                    Content = post.Content,
                    Image = post.Image,
                    Title = post.Title,
                    Tag = post.Tag,
                    LikesCount = post.Likes.Count,
                    Comments = post.Comments.Select(comment => new CommentDto
                    {
                        Id = comment.Id,
                        Content = comment.Content,
                        UserId = comment.UserId,
                        Replies = comment.Replies.Select(reply => new ReplyDto
                        {
                            Id = reply.Id,
                            Content = reply.Content,
                            UserId = reply.UserId
                        }).ToList()
                    }).ToList()
                }).ToList();

                return Ok(postDtos);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error retrieving posts: {ex.Message}");
            }
        }






        [HttpPost("addComment")]
        public async Task<IActionResult> AddComment([FromBody] CommentDto commentDto)
        {
            var comment = new Comment
            {
                PostId = commentDto.PostId,
                UserId = commentDto.UserId,
                Content = commentDto.Content
            };

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return Ok(comment);
        }
        [HttpPost("addReply")]
        public async Task<IActionResult> AddReply([FromBody] ReplyDto replyDto)
        {
            var reply = new Reply
            {
                CommentId = replyDto.CommentId,
                UserId = replyDto.UserId,
                Content = replyDto.Content
            };

            _context.Replies.Add(reply);
            await _context.SaveChangesAsync();

            return Ok(reply);
        }
        [HttpPost("likePost")]
        public async Task<IActionResult> LikePost(long postId, int userId)
        {
            var existingLike = await _context.Likes.FirstOrDefaultAsync(l => l.PostId == postId && l.UserId == userId);
            if (existingLike != null)
            {
                _context.Likes.Remove(existingLike);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Like removed" });
            }

            var like = new Like
            {
                PostId = postId,
                UserId = userId
            };

            _context.Likes.Add(like);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Post liked" });
        }
        [HttpPost("likeComment")]
        public async Task<IActionResult> LikeComment(long commentId, int userId)
        {
            var existingLike = await _context.Likes.FirstOrDefaultAsync(l => l.CommentId == commentId && l.UserId == userId);
            if (existingLike != null)
            {
                _context.Likes.Remove(existingLike);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Like removed" });
            }

            var like = new Like
            {
                CommentId = commentId,
                UserId = userId
            };

            _context.Likes.Add(like);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Comment liked" });
        }
        [HttpGet("sharePost/whatsapp/{postId}")]
        public async Task<IActionResult> SharePostOnWhatsApp(long postId)
        {
            var post = await _context.Posts.FindAsync(postId);
            if (post == null)
            {
                return NotFound();
            }

            var postUrl = $"https://yourwebsite.com/post/{postId}";
            var whatsappShareUrl = $"https://wa.me/?text=Check out this post: {postUrl}";

            return Ok(new { shareUrl = whatsappShareUrl });
        }
        [HttpGet("sharePost/facebook/{postId}")]
        public async Task<IActionResult> SharePostOnFacebook(long postId)
        {
            var post = await _context.Posts.FindAsync(postId);
            if (post == null)
            {
                return NotFound();
            }

            var postUrl = $"https://yourwebsite.com/post/{postId}";
            var facebookShareUrl = $"https://www.facebook.com/sharer/sharer.php?u={postUrl}";

            return Ok(new { shareUrl = facebookShareUrl });
        }
















    }
}
