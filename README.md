# 📚 Book Tracker API

A scalable backend system built with **FastAPI** for managing books.

Designed with performance, clean architecture, and real-world scalability in mind.

Supports datasets of **10M+ records** with pagination, indexing, and optimized queries.

---

## 🎯 Features

### 📖 Book Management
- Create books
- List books (paginated)
- Strong backend validation
- Clean API responses

---

### 🔎 Search
- Search by title and author
- Case-insensitive partial matching
- Optimized database queries

---

### 📄 Pagination
- Server-side pagination (skip / limit)
- Efficient for large datasets
- Prevents memory overload

---

### 🔃 Sorting
- Sort by:
  - id / created_at
  - title
  - author
  - pages
  - rating
- Asc / Desc ordering

---

## 🧠 Architecture Decisions

- PostgreSQL database
- Indexed columns (title, author)
- Separation of concerns (routes / schemas / models / db)
- Pydantic validation layer
- REST API stateless design
- Query-level filtering in database (no in-memory operations)

---

## 🏗️ Tech Stack

- FastAPI
- SQLAlchemy
- PostgreSQL
- Pydantic
- Uvicorn
- Pytest

---

## 📁 Project Structure

````
app/
├── main.py
├── database.py
├── models.py
├── schemas.py
├── routes.py
````
---

## 🔌 API Endpoints

### Create Book
````POST /books````

### Get Books
````GET /books?skip=0&limit=10````

### Search Books
````GET /books/search?q=title````

---

## 🧪 Validation Rules

- title → required (min 1 char)
- author → required (min 1 char)
- isbn → min 10 chars
- pages → > 0
- rating → 1–5

---

## 📈 Scalability

- Indexes on title and author
- Pagination instead of full dataset loading
- Database-level filtering
- Optimized query execution

---

## 📸 Screenshots

### 1. Swagger UI
screenshots/1-swagger.png

### 2. Create Book
screenshots/2-create-book.png

### 3. Book List + Pagination
screenshots/3-pagination.png

### 4. Search Feature
screenshots/4-search.png

### 5. Validation Errors
screenshots/5-validation.png

---

## 📂 Required Screenshots

Zrób i wrzuć do folderu:

screenshots/

Pliki:

- 1-swagger.png
- 2-create-book.png
- 3-pagination.png
- 4-search.png
- 5-validation.png

---

## 🖥️ Run Project

Backend:
``uvicorn backend.app.main:app --reload``

Frontend:
``
npm install
npm run dev``

---

## 🧪 Tests

``pytest backend/tests``

---

## 🚀 Future Improvements

- Docker setup
- JWT authentication
- Redis caching
- Full-text search (PostgreSQL tsvector)
- CI/CD pipeline

---

## 👤 Author

Backend project built for recruitment task.

Focus:
- scalable architecture
- clean code
- database design
- real-world backend practices

---

## 📌 Status

✔ Backend complete  
✔ Database integration  
✔ Search + pagination  
✔ Validation  
✔ Tests  
⏳ Frontend polishing (optional)