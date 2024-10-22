


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
        private readonly EmailService _emailService;

        public CommunityController(MyDbContext context, EmailService emailService)
        {
            _context = context;
            _emailService = emailService;

        }
        [HttpPost("createPost")]
        public async Task<IActionResult> CreatePost([FromForm] PostDto postDto)
        {
            string fileName = null;

            // تحقق من وجود المستخدم
            var userExists = await _context.Users.AnyAsync(u => u.UserId == postDto.UserId);
            if (!userExists)
            {
                return BadRequest(new { success = false, message = "Invalid UserId. The user does not exist." });
            }

            // التحقق من وجود الصورة وحجمها
            if (postDto.ImageFile != null && postDto.ImageFile.Length > 0)
            {
                var imagesPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");
                if (!Directory.Exists(imagesPath))
                {
                    Directory.CreateDirectory(imagesPath);
                }

                fileName = $"{Guid.NewGuid()}{Path.GetExtension(postDto.ImageFile.FileName)}";
                var filePath = Path.Combine(imagesPath, fileName);

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
                Image = fileName,
                Status = "Pending" // تعيين الحالة إلى Pending
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
        [HttpGet("getAllApprovedPosts")]
        public async Task<IActionResult> GetAllApprovedPosts()
        {
            try
            {
                var approvedPosts = await _context.Posts
                    .Where(p => p.Status == "Approved")
                    .Include(p => p.User)
                    .Include(p => p.Comments)
                        .ThenInclude(c => c.Replies)
                    .Include(p => p.Likes)
                    .ToListAsync();

                if (approvedPosts == null || !approvedPosts.Any())
                {
                    return NotFound("No approved posts found.");
                }

                var postDtos = approvedPosts.Select(post => new PostDto1
                {
                    Id = (int)post.Id,
                    UserId = (int)post.UserId,
                    UserName = post.User.UserName, // إضافة UserName هنا
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
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error retrieving approved posts: {ex.Message}");
            }
        }

        [HttpGet("getAllRejectedPosts")]
        public async Task<IActionResult> GetAllRejectedPosts()
        {
            try
            {
                var rejectedPosts = await _context.Posts
                    .Where(p => p.Status == "Rejected")
                    .Include(p => p.User)
                    .Include(p => p.Comments)
                        .ThenInclude(c => c.Replies)
                    .Include(p => p.Likes)
                    .ToListAsync();

                if (rejectedPosts == null || !rejectedPosts.Any())
                {
                    return NotFound("No rejected posts found.");
                }

                var postDtos = rejectedPosts.Select(post => new PostDto1
                {
                    Id = (int)post.Id,
                    UserId = (int)post.UserId,
                    UserName = post.User.UserName, // إضافة UserName هنا
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
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error retrieving rejected posts: {ex.Message}");
            }
        }

        [HttpGet("getAllPendingPosts")]
        public async Task<IActionResult> GetAllPendingPosts()
        {
            try
            {
                var pendingPosts = await _context.Posts
                    .Where(p => p.Status == "Pending")
                    .Include(p => p.User)
                    .Include(p => p.Comments)
                        .ThenInclude(c => c.Replies)
                    .Include(p => p.Likes)
                    .ToListAsync();

                if (pendingPosts == null || !pendingPosts.Any())
                {
                    return NotFound("No pending posts found.");
                }

                var postDtos = pendingPosts.Select(post => new PostDto1
                {
                    Id = (int)post.Id,
                    UserId = (int)post.UserId,
                    UserName = post.User.UserName, // إضافة UserName هنا
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
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error retrieving pending posts: {ex.Message}");
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
            var postUrl = $"https://127.0.0.1:4200/post/{postId}";
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

            var postUrl = $"https://127.0.0.1:4200/post/{postId}";
            var facebookShareUrl = $"https://www.facebook.com/sharer/sharer.php?u={postUrl}";

            return Ok(new { shareUrl = facebookShareUrl });
        }

        [HttpPost("approvePost/{postId}")]
        public async Task<IActionResult> ApprovePost(long postId, int approverUserId)
        {
            var post = await _context.Posts.FindAsync(postId);

            if (post == null)
            {
                return NotFound("Post not found.");
            }

            post.Status = "Approved"; // Change status based on your logic
            await _context.SaveChangesAsync();

            // Fetch the user's email who created the post
            var postUser = await _context.Users.FirstOrDefaultAsync(u => u.UserId == post.UserId);
            if (postUser == null)
            {
                return NotFound("User associated with the post not found.");
            }

            // إعداد البريد الإلكتروني للموافقة أو الرفض
            var subject = "تمت الموافقة على منشورك";
            var body = $"مرحبًا، تم الموافقة على منشورك بعنوان: {post.Title}. شكرًا لك!";
            await _emailService.SendEmailAsync(postUser.Email, subject, body, approverUserId);

            return Ok("Post approved successfully and email sent.");
        }

        [HttpPost("rejectPost/{postId}")]
        public async Task<IActionResult> RejectPost(long postId, int approverUserId)
        {
            var post = await _context.Posts.FindAsync(postId);

            if (post == null)
            {
                return NotFound("Post not found.");
            }

            post.Status = "Rejected"; // Change status based on your logic
            await _context.SaveChangesAsync();

            // Fetch the user's email who created the post
            var postUser = await _context.Users.FirstOrDefaultAsync(u => u.UserId == post.UserId);
            if (postUser == null)
            {
                return NotFound("User associated with the post not found.");
            }

            // إعداد البريد الإلكتروني للرفض
            var subject = "تم رفض منشورك";
            var body = $"مرحبًا، تم رفض منشورك بعنوان: {post.Title}. يرجى مراجعته وإجراء التعديلات المطلوبة.";
            await _emailService.SendEmailAsync(postUser.Email, subject, body, approverUserId);

            return Ok("Post rejected and email sent.");
        }














    }
}
