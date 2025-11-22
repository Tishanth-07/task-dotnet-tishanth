using InventoryBackend.Models;
using System.Text.Json;

namespace InventoryBackend.Services
{
    public class JsonDataService
    {
        private readonly string _filePath;
        private readonly object _fileLock = new object();
        private readonly JsonSerializerOptions _opts = new JsonSerializerOptions { WriteIndented = true };

        public JsonDataService(IWebHostEnvironment env)
        {
            // place data.json in content root (project folder / backend)
            _filePath = Path.Combine(env.ContentRootPath, "data.json");

            // ensure file exists and has root structure
            if (!File.Exists(_filePath))
            {
                var initial = new DataRoot();
                WriteData(initial);
            }
            else
            {
                // quick validation: if missing properties, seed defaults
                try
                {
                    var data = ReadData();
                    if (data == null)
                    {
                        WriteData(new DataRoot());
                    }
                }
                catch
                {
                    WriteData(new DataRoot());
                }
            }
        }

        public DataRoot ReadData()
        {
            lock (_fileLock)
            {
                var json = File.ReadAllText(_filePath);
                var data = JsonSerializer.Deserialize<DataRoot>(json);
                return data ?? new DataRoot();
            }
        }

        public void WriteData(DataRoot data)
        {
            lock (_fileLock)
            {
                var json = JsonSerializer.Serialize(data, _opts);
                File.WriteAllText(_filePath, json);
            }
        }

        // --- Helper operations used by controllers ---

        public IEnumerable<Product> GetProducts() => ReadData().Products;

        public Product? GetProductById(int id) => ReadData().Products.FirstOrDefault(p => p.Id == id);

        public Product AddProduct(Product p)
        {
            var data = ReadData();
            p.Id = data.Products.Any() ? data.Products.Max(x => x.Id) + 1 : 1;
            data.Products.Add(p);
            WriteData(data);
            return p;
        }

        public bool UpdateProduct(int id, Product updated)
        {
            var data = ReadData();
            var idx = data.Products.FindIndex(p => p.Id == id);
            if (idx == -1) return false;
            updated.Id = id;
            data.Products[idx] = updated;
            WriteData(data);
            return true;
        }

        public bool DeleteProduct(int id)
        {
            var data = ReadData();
            var removed = data.Products.RemoveAll(p => p.Id == id) > 0;
            if (removed) WriteData(data);
            return removed;
        }
    }
}
