using InventoryBackend.Models;
using InventoryBackend.Services;
using Microsoft.AspNetCore.Mvc;

namespace InventoryBackend.Controllers
{
    // Category endpoints (CRUD)
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly JsonDataService _data;

        public CategoriesController(JsonDataService data)
        {
            _data = data;
        }

        // GET: api/categories
        [HttpGet]
        public ActionResult<IEnumerable<Category>> GetAll()
        {
            return Ok(_data.GetCategories());
        }

        // GET: api/categories/{id}
        [HttpGet("{id}", Name = "GetCategory")]
        public ActionResult<Category> Get(int id)
        {
            var c = _data.GetCategoryById(id);
            if (c == null) return NotFound();
            return Ok(c);
        }

        // POST: api/categories
        [HttpPost]
        public ActionResult<Category> Create([FromBody] Category category)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var added = _data.AddCategory(category);
            return CreatedAtRoute("GetCategory", new { id = added.Id }, added);
        }

        // PUT: api/categories/{id}
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Category category)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var ok = _data.UpdateCategory(id, category);
            if (!ok) return NotFound();
            return NoContent();
        }

        // DELETE: api/categories/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var ok = _data.DeleteCategory(id);
            if (!ok) return BadRequest(new { message = "Cannot delete category. It may be in use by products or not exist." });
            return NoContent();
        }
    }
}
