using System.Collections.Generic;

namespace InventoryBackend.Models
{
    // Root structure that serializes to data.json
    public class DataRoot
    {
        public List<Product> Products { get; set; } = new List<Product>();
        public List<Category> Categories { get; set; } = new List<Category>();
    }
}
