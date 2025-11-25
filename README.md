# Inventory Management System

A full-stack **Inventory Management Web Application** built using **ASP.NET Core 7 Web API** (backend) and **React + Tailwind CSS** (frontend).

This system provides product and category management, a responsive dashboard, CRUD functionality, sorting, filtering, pagination, and JSON-based local data storage for persistence.

---

## Project Overview

This project is designed for small or medium businesses to manage inventory without needing a heavy database.

### 🔹 Dashboard

- Total Products
- Total Categories
- Active Products
- Low Stock Alerts (below **5 units**)

### 🔹 Product Management

- List all products
- Add / Edit / Delete products
- Search by name or product code
- Filter by category
- Sorting (price, stock, status)
- Pagination
- Status indicator (🟢 Active / 🔴 Inactive)

### 🔹 Category Management

- Add / Edit / Delete categories
- Products must belong to a valid category
- Stored inside the same **data.json**

### 🔹 Fully Functional REST API (ASP.NET Core 7)

- CRUD for **Products**
- CRUD for **Categories**
- Data saved in **Data/data.json**
- File-based persistent storage

### 🔹 Frontend Features (React + Tailwind)

- Responsive layout
- Sidebar navigation
- Axios API integration
- Toast notifications
- Modals & confirmation alerts
- Context API state management
- Form validation for product creation/editing
- Refresh button to reload all data
- Color indicator for product status ( green for active, red for inactive)
- Pagination for product list

---

## Technologies Used

### 🔹 Backend (ASP.NET Core 7)

- C#
- ASP.NET Core Web API
- System.Text.Json
- JSON file persistence
- Dependency Injection
- CORS enabled

### 🔹 Frontend (React + Tailwind CSS)

- React (CRA)
- Tailwind CSS
- Axios
- React Router
- React Context API
- React Icons

---

## Project Structure

### 🔹 Backend

inventory-management/
├── backend/
│ ├── bin/
│ ├── Controllers/
│ │ ├── CategoriesController.cs
│ │ ├── DashboardController.cs
│ │ └── ProductsController.cs
│ ├── Models/
│ │ ├── Category.cs
│ │ ├── DataRoot.cs
│ │ └── Product.cs
│ ├── obj/
│ ├── Properties/
│ ├── Services/
│ ├── appsettings.Development.json
│ ├── appsettings.json
│ ├── backend.csproj
│ ├── data.json
│ └── Program.cs

### 🔹 Frontend

inventory-management/
├── frontend/
│ ├── node_modules/
│ ├── public/
│ ├── src/
│ │ ├── api/
│ │ │ ├── TS apits
│ │ │ └── JS index.js
│ │ ├── components/
│ │ │ ├── CategoryForm.jsx
│ │ │ ├── ConfirmModal.jsx
│ │ │ ├── ProductForm.jsx
│ │ │ ├── Sidebar.jsx
│ │ │ └── Toast.jsx
│ │ ├── pages/
│ │ │ ├── Categories.jsx
│ │ │ ├── Dashboard.jsx
│ │ │ └── Products.jsx
│ │ ├── services/
│ │ │ ├── categoryService.js
│ │ │ └── productService.js
│ │ ├── App.js
│ │ ├── App.test.js
│ │ ├── index.css
│ │ ├── index.js
│ │ ├── logo.svg
│ │ ├── reportWebVitals.js
│ │ └── setupTests.js
│ ├── .env.local
│ └── .gitignore
│ ├── package-lock.json
│ ├── package.json
│ ├── postcss.config.js
│ ├── README.md
│ ├── tailwind.config.js
│ ├── tsconfig.json
│ ├── .gitignore
│ ├── inventory-management.sln
│ └── README.md

---

## Setup Instructions

### 🔹 Backend Setup (ASP.NET Core 7)

- Navigate into backend folder - `cd backend`
- Restore dependencies - `dotnet restore`
- Run the API - `dotnet run`
- API Base URL - `https://localhost:5204`
- JSON Data File - `Data/data.json`

### 🔹 Frontend Setup (React + Tailwind CSS)

- Navigate into frontend folder - `cd frontend`
- Install Tailwind CSS (if not installed) - `npm install -D tailwindcss postcss autoprefixer npx tailwindcss init -p`
- Install Axios - `npm install axios`
- Setup .env file - `REACT_APP_API_BASE_URL=https://localhost:5204/api`
- Start frontend - `npm start`

### 🔹 How to Run the Full Project

- Start backend - `cd backend dotnet run`
- Start frontend - `cd frontend npm start`
- Visit UI in browser - `http://localhost:3000`

---

## Screenshots

![Dashboard Screenshot](public/screenshots/Screenshot1.png)
![Product Page – Add & Refresh](public/screenshots/Screenshot2.png)
![Product Page – Pagination](public/screenshots/Screenshot3.png)
![Category Page](public/screenshots/Screenshot4.png)

---

## Known Limitations

- JSON file may lock with heavy requests - **File storage limitation**
- Not ideal for enterprise - **Only for small apps**
- No authentication system - **Simple learning project**
- Large datasets not recommended - **JSON not meant for huge data**
