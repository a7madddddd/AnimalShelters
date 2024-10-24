using AnimalShelters3.Server.DTOs;
using AnimalShelters3.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AnimalShelters3.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdoptionController : ControllerBase
    {



        private readonly MyDbContext _context;

        public AdoptionController(MyDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<AdoptionApplication>> CreateAdoptionApplication(AdoptionApplication application)
        {
            if (application == null || application.UserId == null || application.AnimalId == null)
            {
                return BadRequest("UserId and AnimalId are required.");
            }

            application.Status = "Pending"; // Set initial status
            application.SubmittedAt = DateTime.UtcNow; // Set the submission time
            application.UpdatedAt = DateTime.UtcNow; // Set the updated time

            _context.AdoptionApplications.Add(application);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAdoptionApplication), new { id = application.ApplicationId }, application);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AdoptionApplication>> GetAdoptionApplication(int id)
        {
            var application = await _context.AdoptionApplications.FindAsync(id);

            if (application == null)
            {
                return NotFound();
            }

            return application;
        }


        // GET: api/adoption
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdoptionApplication>>> GetAdoptionApplications()
        {
            return await _context.AdoptionApplications.ToListAsync();
        }

        // PUT: api/adoption/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAdoptionApplication(int id, AdoptionApplication application)
        {
            if (id != application.ApplicationId)
            {
                return BadRequest();
            }

            _context.Entry(application).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdoptionApplicationExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        // DELETE: api/adoption/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdoptionApplication(int id)
        {
            var application = await _context.AdoptionApplications.FindAsync(id);
            if (application == null)
            {
                return NotFound();
            }

            _context.AdoptionApplications.Remove(application);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AdoptionApplicationExists(int id)
        {
            return _context.AdoptionApplications.Any(e => e.ApplicationId == id);
        }
    }
}
   