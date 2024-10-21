


using AnimalShelters3.Server.DTOs;
using AnimalShelters3.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity; // Ensure this is included
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

        [HttpPost]
        public IActionResult SignUp([FromForm] UserDTORequiest user)
        {
            // Check if the email is already registered
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
                PasswordHash = passwordHash,  // Set the hashed password
                PasswordSalt = passwordSalt    // Store the salt for later verification
            };

            // Add the new user to the database
            _db.Users.Add(newUser);
            _db.SaveChanges();

            return Ok("Success");
        }

        private byte[] HashPassword(string password, out byte[] salt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                // Generate a random salt
                salt = hmac.Key;
                // Compute the hash
                return hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}
