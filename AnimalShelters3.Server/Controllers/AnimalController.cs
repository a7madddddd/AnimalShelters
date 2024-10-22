using Microsoft.AspNetCore.Mvc;
using AnimalShelters3.Server.Models; // Your model namespace
using System.Linq;
using AnimalShelters3.Server.DTOs;

namespace AnimalShelters3.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnimalController : ControllerBase
    {
        private readonly MyDbContext _context; // Assuming this is your database context class

        public AnimalController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/Animal/AllAnimals
        [HttpGet("AllAnimals")]
        public IActionResult GetAllAnimals()
        {
            var animals = _context.Animals.ToList();
            return Ok(animals);
        }

        // GET: api/Animal/{id}
        [HttpGet("{id}")]
        public IActionResult GetAnimalById(int id)
        {
            var animal = _context.Animals.Find(id);
            if (animal == null)
            {
                return NotFound();
            }
            return Ok(animal);
        }

        // POST: api/Animal/AddAnimal
        // POST: api/Animal/AddAnimal
        [HttpPost("AddAnimal")]
        public async Task<IActionResult> AddAnimal([FromForm] AnimalDto newAnimalDto, IFormFile imageFile)
        {
            if (ModelState.IsValid)
            {
                var newAnimal = new Animal
                {
                    Name = newAnimalDto.Name,
                    Age = newAnimalDto.Age,
                    Temperament = newAnimalDto.Temperament,
                    CategoryId = newAnimalDto.CategoryId
                };

                // Handle file upload
                if (imageFile != null && imageFile.Length > 0)
                {
                    var uploadsDir = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
                    if (!Directory.Exists(uploadsDir))
                    {
                        Directory.CreateDirectory(uploadsDir);
                    }

                    var fileName = $"{Guid.NewGuid()}_{Path.GetFileName(imageFile.FileName)}";
                    var filePath = Path.Combine(uploadsDir, fileName);

                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await imageFile.CopyToAsync(fileStream);
                    }

                    // Save the file path as the ImageUrl in the database
                    newAnimal.ImageUrl = $"/uploads/{fileName}";
                }

                _context.Animals.Add(newAnimal);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetAnimalById), new { id = newAnimal.AnimalId }, newAnimal);
            }
            return BadRequest(ModelState);
        }


        // PUT: api/Animal/{id}
        // PUT: api/Animal/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAnimal(int id, [FromForm] AnimalDto updatedAnimalDto, IFormFile imageFile)
        {
            var existingAnimal = _context.Animals.Find(id);
            if (existingAnimal == null)
            {
                return NotFound();
            }

            existingAnimal.Name = updatedAnimalDto.Name;
            existingAnimal.Age = updatedAnimalDto.Age;
            existingAnimal.Temperament = updatedAnimalDto.Temperament;
            existingAnimal.CategoryId = updatedAnimalDto.CategoryId;
            existingAnimal.ShelterId = updatedAnimalDto.ShelterId;


            // Handle file upload
            if (imageFile != null && imageFile.Length > 0)
            {
                var uploadsDir = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
                if (!Directory.Exists(uploadsDir))
                {
                    Directory.CreateDirectory(uploadsDir);
                }

                var fileName = $"{Guid.NewGuid()}_{Path.GetFileName(imageFile.FileName)}";
                var filePath = Path.Combine(uploadsDir, fileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(fileStream);
                }

                // Update the file path as the ImageUrl in the database
                existingAnimal.ImageUrl = $"/uploads/{fileName}";
            }

            _context.Animals.Update(existingAnimal);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        // DELETE: api/Animal/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteAnimal(int id)
        {
            var Animal = _context.Animals.Find(id);
            if (Animal == null)
            {
                return NotFound();
            }

            _context.Animals.Remove(Animal);
            _context.SaveChanges();

            return NoContent();
        }


        [HttpGet]
        public IActionResult GetAnimalsByShelter(int shelterId)
        {
            var animals = _context.Animals.Where(a => a.ShelterId == shelterId).ToList();
            return Ok(animals);
        }
    }
}
