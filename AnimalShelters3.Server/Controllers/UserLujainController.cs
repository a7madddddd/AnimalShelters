using AnimalShelters3.Server.DTOs;
using AnimalShelters3.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity; 
using Microsoft.AspNetCore.Mvc;
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
            var user =_db.Users.ToList();
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
                Password=user.Password,
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
