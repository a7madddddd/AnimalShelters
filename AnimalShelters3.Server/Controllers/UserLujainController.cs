using AnimalShelters3.Server.DTOs;
using AnimalShelters3.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
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
            var user = _db.Users.Where(p => p.UserId == id).FirstOrDefault();

            if (user == null)
            {
                return NotFound($"User with ID {id} not found.");
            }

            // Handle image upload
            if (userProfileDto.Image != null && userProfileDto.Image.Length > 0)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                var uniqueFileName = Guid.NewGuid().ToString() + "_" + userProfileDto.Image.FileName;
                var filePathWwwroot = Path.Combine(uploadsFolder, uniqueFileName);

                using (var fileStream = new FileStream(filePathWwwroot, FileMode.Create))
                {
                    userProfileDto.Image.CopyTo(fileStream);
                }

                user.Image = $"/images/{uniqueFileName}";
            }

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

            // Save changes to the database
            _db.Users.Update(user);
            _db.SaveChanges();

            return Ok(new { message = "Profile updated successfully" });
        }


        [HttpGet("/Adoption")]
        public IActionResult adoption()
        {

            var adoption = _db.AdoptionApplications.ToList();
            return Ok(adoption);
        }

        [HttpGet("AdoptionByUserId/{id}")]
        public IActionResult addoptionId(int id) { 
        
        var adoption = _db.AdoptionApplications.Join(_db.Animals,
            adoption=>adoption.AnimalId,
            animal=>animal.AnimalId,
            (adoption,animal) => new
            {
                applicationId=adoption.ApplicationId,
                userId=adoption.UserId,
                status=adoption.Status,
                submittedAt=adoption.SubmittedAt,
                message=adoption.Message,
                animalName= animal.Name,
                animalAge=animal.Age,
                animalBread=animal.Breed,
                animalTemp= animal.Temperament,

            }).Where(a=>a.userId == id).FirstOrDefault();
            return Ok(adoption);
        
        }



        [HttpGet("FromId/{id}")]
        public IActionResult FormId(int id)
        {
            var formId= _db.AdoptionApplications.Join(_db.Animals,
            adoption => adoption.AnimalId,
            animal => animal.AnimalId,
            (adoption, animal) => new
            {
                applicationId = adoption.ApplicationId,
                userId = adoption.UserId,
                status = adoption.Status,
                submittedAt = adoption.SubmittedAt,
                message = adoption.Message,
                animalName = animal.Name,
                animalAge = animal.Age,
                animalBread = animal.Breed,
                animalTemp = animal.Temperament,

            }).Where(a=>a.applicationId == id).FirstOrDefault();
            return Ok(formId);
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
