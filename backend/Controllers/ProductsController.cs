using InventoryBackend.Models;
using InventoryBackend.Services;
using Microsoft.AspNetCore.Mvc;

namespace InventoryBackend.Controllers
{
    // Product endpoints (CRUD)
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly JsonDataService _data;

        public ProductsController(JsonDataService data)
        {
            _data = data;
        }

        // GET: api/products
        [HttpGet]
        public ActionResult<IEnumerable<Product>> GetAll([FromQuery] int? categoryId, [FromQuery] string? search)
        {
            var products = _data.GetProducts().AsQueryable();

            if (categoryId.HasValue)
                products = products.Where(p => p.CategoryId == categoryId.Value);

            if (!string.IsNullOrWhiteSpace(search))
            {
                var s = search.Trim().ToLower();
                products = products.Where(p => p.ProductName.ToLower().Contains(s) || p.ProductCode.ToLower().Contains(s));
            }

            return Ok(products);
        }

        // GET: api/products/{id}
        [HttpGet("{id}", Name = "GetProduct")]
        public ActionResult<Product> Get(int id)
        {
            var p = _data.GetProductById(id);
            if (p == null) return NotFound();
            return Ok(p);
        }

        // POST: api/products
        [HttpPost]
        public ActionResult<Product> Create([FromBody] Product product)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            // Ensure category exists
            var category = _data.GetCategoryById(product.CategoryId);
            if (category == null) return BadRequest(new { message = "Category not found." });

            var added = _data.AddProduct(product);
            return CreatedAtRoute("GetProduct", new { id = added.Id }, added);
        }

        // PUT: api/products/{id}
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Product product)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            // Ensure category exists
            var cat = _data.GetCategoryById(product.CategoryId);
            if (cat == null) return BadRequest(new { message = "Category not found." });

            var ok = _data.UpdateProduct(id, product);
            if (!ok) return NotFound();
            return NoContent();
        }

        // DELETE: api/products/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var ok = _data.DeleteProduct(id);
            if (!ok) return NotFound();
            return NoContent();
        }
    }
}
