# InventoryBackend (ASP.NET Core 7) - Inventory Management API

## Requirements
- .NET 7 SDK installed

## Run
1. cd backend
2. dotnet restore
3. dotnet run

By default the app will listen on the URLs shown in console. Use `http://localhost:5204` or the URL displayed.

## Endpoints
- GET    /api/products
- GET    /api/products/{id}
- POST   /api/products
- PUT    /api/products/{id}
- DELETE /api/products/{id}


## Data storage
- All data persisted in `data.json` in the project root.
- The service ensures thread-safe read/write operations.

