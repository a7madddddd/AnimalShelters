using AnimalShelters3.Server.DTOs;
using AnimalShelters3.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AnimalShelters3.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactUsController : ControllerBase
    {
        private readonly MyDbContext _db;

        public ContactUsController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet("GetAllContacts")]
        public IActionResult GetAllContacts()
        {
            var Con = _db.Contacts.ToList();
            return Ok(Con);
        }




        [HttpGet("GetByDesc")]
        public IActionResult GetContact()
        {
            var contacts = _db.Contacts
                .OrderByDescending(c => c.CreatedAt)
                .ToList();

            var formattedContacts = contacts.Select(c => new
            {
                c.Message,
                c.Id,
                c.Name,
                c.Email,
                c.PhoneNum,
                CreatedAt = c.CreatedAt.HasValue
                    ? c.CreatedAt.Value.ToString("yyyy-MM-dd HH:mm")
                    : "N/A"
            }).ToList();

            return Ok(formattedContacts);
        }

        [HttpPost("AddContact")]
        public IActionResult AddMessage([FromForm] ContactRequest request)
        {
            var newContact = new Contact
            {
                Name = request.Name,
                Email = request.Email,
                Message = request.Message,
                PhoneNum = request.PhoneNum,
            };
            _db.Contacts.Add(newContact);
            _db.SaveChanges();
            return Ok(new { message = "Contact added successfully" });
        }


        [HttpDelete("DeleteContact/{id}")]
        public IActionResult DeleteContact(int id)
        {
            if (id <= 0)
            {
                return BadRequest("No Contact For This ID");
            }

            var cintact = _db.Contacts.FirstOrDefault(u => u.Id == id);
            if (cintact == null)
            {
                return NotFound();
            }
            _db.Contacts.Remove(cintact);
            _db.SaveChanges();
            return Ok();
        }

        // Shelters
        [HttpGet("latest")]
        public async Task<ActionResult<IEnumerable<Shelter>>> GetLatestVerifiedShelters()
        {
            var latestShelters = await _db.Shelters
                
                .OrderByDescending(s => s.CreatedAt) 
                .Take(4) 
                .ToListAsync();

            return Ok(latestShelters);
        }


    }
}
