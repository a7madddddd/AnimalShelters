using AnimalShelters3.Server.DTOs;
using AnimalShelters3.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace AnimalShelters3.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserLujainController : ControllerBase
    {
        private readonly MyDbContext _db;

        public UserLujainController(MyDbContext db)
        {
            _db = db;
        }
        [HttpGet]
        public IActionResult GetAllUser()
        {
            var user = _db.Users.ToList();
            return Ok(user);
        }

        [HttpGet("{id}")]
        public IActionResult GetUserByID(int id)
        {

            var user = _db.Users.Where(a => a.UserId == id).FirstOrDefault();
            return Ok(user);

        }

        [HttpPost]
        public IActionResult SignUp([FromForm] UserDTORequiest user)
        {
            var existingUser = _db.Users.FirstOrDefault(a => a.Email == user.Email);
            if (existingUser != null)
            {
                return BadRequest("There is a user registered with this email.");
            }

            // Hash the password
            byte[] passwordSalt;
            var passwordHash = HashPassword(user.Password, out passwordSalt);

            var newUser = new User
            {
                Email = user.Email,
                UserName = user.UserName,
                Password = user.Password,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt
            };

            _db.Users.Add(newUser);
            _db.SaveChanges();

            return Ok(new { message = "User added successfully" });
        }

        [HttpPost("Login")]
        public IActionResult Login([FromForm] UserDToLogin user)
        {
            var existingUser = _db.Users.FirstOrDefault(a => a.Email == user.Email);

            if (existingUser == null)
            {
                return BadRequest("Invalid email or password.");
            }

            // Validate the password
            var passwordHash = HashPasswordWithSalt(user.Password, existingUser.PasswordSalt);
            if (!passwordHash.SequenceEqual(existingUser.PasswordHash))
            {
                return BadRequest("Invalid email or password.");
            }

            return Ok(new { UserId = existingUser.UserId, message = "Login successful" });
        }

        [HttpPut("{id}")]
        public IActionResult EditProfile(int id, [FromForm] UserProfileDto userProfileDto)
        {
            if (userProfileDto == null)
            {
                return BadRequest("User profile data is null.");
            }

            var user = _db.Users.Find(id); 
            if (user == null)
            {
                return NotFound($"User with ID {id} not found."); 
            }

            // Update user properties
            if (!string.IsNullOrEmpty(userProfileDto.UserName))
            {
                user.UserName = userProfileDto.UserName;
            }
            if (!string.IsNullOrEmpty(userProfileDto.Email))
            {
                user.Email = userProfileDto.Email;
            }
            if (!string.IsNullOrEmpty(userProfileDto.Description))
            {
                user.Description = userProfileDto.Description;
            }
            if (userProfileDto.UserAge.HasValue)
            {
                user.UserAge = userProfileDto.UserAge.Value;
            }
            if (!string.IsNullOrEmpty(userProfileDto.UserAdderss)) 
            {
                user.UserAdderss = userProfileDto.UserAdderss;
            }
            if (userProfileDto.Image != null && userProfileDto.Image.Length > 0)
            {
                var folder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");

                if (!Directory.Exists(folder))
                {
                    Directory.CreateDirectory(folder);
                }

                // Define your upload path
                var filePath = Path.Combine(folder, userProfileDto.Image.FileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    userProfileDto.Image.CopyTo(stream); 
                }

                user.Image = userProfileDto.Image.FileName; 
            }

            // Save changes to the database
            _db.Users.Update(user);
            _db.SaveChanges(); 

            return Ok(user);
        }

























        private byte[] HashPassword(string password, out byte[] salt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                salt = hmac.Key;
                return hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }


        private byte[] HashPasswordWithSalt(string password, byte[] salt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(salt))
            {
                return hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}
