using System.ComponentModel.DataAnnotations;

namespace InventoryBackend.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required]
        public string ProductName { get; set; } = null!;

        [Required]
        public string ProductCode { get; set; } = null!;

        // Must correspond to an existing Category.Id
        [Required]
        public int CategoryId { get; set; }

        [Range(0, double.MaxValue)]
        public decimal Price { get; set; }

        [Range(0, int.MaxValue)]
        public int StockQuantity { get; set; }

        public bool IsActive { get; set; } = true;
    }
}
