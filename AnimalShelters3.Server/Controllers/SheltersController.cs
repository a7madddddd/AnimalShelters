using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AnimalShelters3.Server.Models;
using AnimalShelters3.Server.DTOs;

namespace AnimalShelters3.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SheltersController : ControllerBase
    {
        private readonly MyDbContext _context;

        public SheltersController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/Shelters
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Shelter>>> GetShelters()
        {
            return await _context.Shelters.ToListAsync();
        }

        // GET: api/Shelters/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Shelter>> GetShelter(int id)
        {
            var shelter = await _context.Shelters.FindAsync(id);

            if (shelter == null)
            {
                return NotFound();
            }

            return shelter;
        }

        // PUT: api/Shelters/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutShelter(int id, Shelter shelter)
        {
            if (id != shelter.ShelterId)
            {
                return BadRequest();
            }

            _context.Entry(shelter).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShelterExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Shelters
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("addShelter")]
        public async Task<ActionResult<Shelter>> PostShelter(ShelterDTO shelterDto)
        {
            // Map DTO to Entity
            var shelter = new Shelter
            {
                Name = shelterDto.Name,
                Address = shelterDto.Address,
                Phone = shelterDto.Phone,
                Email = shelterDto.Email,
                Verified = shelterDto.Verified,
                CreatedAt = shelterDto.CreatedAt ?? DateTime.UtcNow // Set CreatedAt to now if not provided
            };

            _context.Shelters.Add(shelter);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetShelter", new { id = shelter.ShelterId }, shelter);
        }


        // DELETE: api/Shelters/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShelter(int id)
        {
            var shelter = await _context.Shelters.FindAsync(id);
            if (shelter == null)
            {
                return NotFound();
            }

            _context.Shelters.Remove(shelter);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ShelterExists(int id)
        {
            return _context.Shelters.Any(e => e.ShelterId == id);
        }
    }
}
