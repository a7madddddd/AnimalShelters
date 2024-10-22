using Microsoft.AspNetCore.Mvc;
using AnimalShelters3.Server.Models;
using System.Linq;

namespace AnimalShelters3.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly MyDbContext _context;

        public CategoryController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/Category
        [HttpGet]
        public IActionResult GetAllCategories()
        {
            var categories = _context.Categories.ToList();
            return Ok(categories);
        }

        // GET: api/Category/{id}
        [HttpGet("{id}")]
        public IActionResult GetCategoryById(long id)
        {
            var category = _context.Categories.Find(id);
            if (category == null)
            {
                return NotFound();
            }
            return Ok(category);
        }

        // POST: api/Category
        [HttpPost]
        public IActionResult AddCategory([FromBody] Category newCategory)
        {
            if (ModelState.IsValid)
            {
                _context.Categories.Add(newCategory);
                _context.SaveChanges();
                return CreatedAtAction(nameof(GetCategoryById), new { id = newCategory.Id }, newCategory);
            }
            return BadRequest(ModelState);
        }

        // PUT: api/Category/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateCategory(long id, [FromBody] Category updatedCategory)
        {
            var existingCategory = _context.Categories.Find(id);
            if (existingCategory == null)
            {
                return NotFound();
            }

            existingCategory.Species = updatedCategory.Species;
            existingCategory.Image = updatedCategory.Image;

            _context.Categories.Update(existingCategory);
            _context.SaveChanges();

            return NoContent();
        }

        // DELETE: api/Category/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteCategory(long id)
        {
            var category = _context.Categories.Find(id);
            if (category == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(category);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
