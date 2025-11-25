using InventoryBackend.Services;
using Microsoft.AspNetCore.Mvc;

namespace InventoryBackend.Controllers
{
    // Dashboard summary endpoints
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly JsonDataService _data;
        public DashboardController(JsonDataService data)
        {
            _data = data;
        }

        // GET: api/dashboard -> counts for dashboard cards
        [HttpGet]
        public IActionResult GetSummary()
        {
            var products = _data.GetProducts().ToList();
            var categories = _data.GetCategories().ToList();

            var totalProducts = products.Count;
            var totalCategories = categories.Count;
            var lowStock = products.Count(p => p.StockQuantity < 5);
            var activeProducts = products.Count(p => p.IsActive);

            return Ok(new
            {
                totalProducts,
                totalCategories,
                lowStock,
                activeProducts
            });
        }
    }
}
