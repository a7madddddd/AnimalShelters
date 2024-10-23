using AnimalShelters3.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
    }
}
    
