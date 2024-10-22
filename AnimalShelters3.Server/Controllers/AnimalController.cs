using Microsoft.AspNetCore.Mvc;
using AnimalShelters3.Server.Models; // Your model namespace
using System.Linq;

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
        [HttpPost("AddAnimal")]
        public IActionResult AddAnimal([FromBody] Animal newAnimal)
        {
            if (ModelState.IsValid)
            {
                _context.Animals.Add(newAnimal);
                _context.SaveChanges();
                return CreatedAtAction(nameof(GetAnimalById), new { id = newAnimal.AnimalId }, newAnimal);
            }
            return BadRequest(ModelState);
        }

        // PUT: api/Animal/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateAnimal(int id, [FromBody] Animal updatedAnimal)
        {
            var existingAnimal = _context.Animals.Find(id);
            if (existingAnimal == null)
            {
                return NotFound();
            }

            existingAnimal.Name = updatedAnimal.Name;
            existingAnimal.Breed = updatedAnimal.Breed;
            existingAnimal.Age = updatedAnimal.Age;
            existingAnimal.Temperament = updatedAnimal.Temperament;
            existingAnimal.AdoptionStatus = updatedAnimal.AdoptionStatus;
            existingAnimal.ImageUrl = updatedAnimal.ImageUrl;

            _context.Animals.Update(existingAnimal);
            _context.SaveChanges();

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
    }
}
