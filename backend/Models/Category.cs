using System.ComponentModel.DataAnnotations;

namespace InventoryBackend.Models
{
    // Category entity for grouping products
    public class Category
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = null!;
    }
}
