# 📚 Book Tracker API

A scalable backend system built with **FastAPI** for managing books, designed with performance, clean architecture, and real-world scalability in mind.

The project focuses on building a production-style REST API with data validation, search functionality, and pagination, prepared to handle large datasets (10M+ records).

---

## 🚀 Features

### 📖 Book Management
- Create new books
- Retrieve list of books
- Input validation for all fields
- Clean and consistent API responses

### 🔎 Search Functionality
- Search books by **title** or **author**
- Case-insensitive partial matching
- Efficient SQL filtering using `ILIKE`

### 📄 Pagination
- Server-side pagination (`skip` / `limit`)
- Optimized for large datasets
- Prevents loading full database into memory

---

## 🧠 Key Design Decisions

This project was built with scalability and maintainability in mind:

- **Database indexing** on `title` and `author` for faster search queries  
- **Separation of concerns** (routes, models, schemas, database layer)  
- **Pydantic validation** for request integrity  
- Stateless REST API design  
- Pagination to support large-scale datasets (10M+ records)

---

## 🏗️ Tech Stack

- FastAPI
- SQLAlchemy
- PostgreSQL
- Pydantic
- Uvicorn

---

## 📁 Project Structure
````
app/
├── main.py # Application entry point
├── database.py # Database connection & session
├── models.py # SQLAlchemy models
├── schemas.py # Pydantic validation schemas
├── routes.py # API endpoints
---
````

## 🔌 API Endpoints

### ➕ Create a Book
```
POST /books
 
Request Body:

{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "isbn": "9780132350884",
  "pages": 464,
  "rating": 5
}
```
### 📚 Get Books (Paginated)
```GET /books?skip=0&limit=20```
### 🔍 Search Books
```GET /books/search?q=clean```
### 🧪 Validation Rules
```title → required, min 1 character
author → required, min 1 character
isbn → 10–13 characters
pages → must be greater than 0
rating → range 1–5
```

## 📈 Scalability Considerations

This system was designed with production-like scalability in mind:

Indexed database fields (title, author)
Pagination to handle large datasets efficiently
Query-level filtering instead of in-memory processing
Modular architecture for future expansion
🔮 Future Improvements
Full-text search (PostgreSQL tsvector)
Authentication (JWT)
Docker containerization
Redis caching layer
Async database operations
Rate limiting for API protection
## 👤 Author

Backend project developed as part of a job application task, demonstrating:

REST API design
Database modeling
Scalable backend architecture
Clean code practices
### 📌 Status

✔ Backend completed
⏳ Frontend in progress
⏳ Deployment pending

### 💡 Note

This project was built with a focus on clean architecture, scalability, and production-ready patterns rather than UI complexity.
