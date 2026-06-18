from sqlalchemy.orm import Session
from fastapi import Depends

from database import get_db


@app.get("/books", response_model=list[BookResponse])
def get_books(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 20
):
    return db.query(Book).offset(skip).limit(limit).all()

@app.post("/books", response_model=BookResponse)
def create_book(book: BookCreate, db: Session = Depends(get_db)):
    db_book = Book(**book.dict())
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book

@app.get("/books/search", response_model=list[BookResponse])
def search_books(
    q: str,
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 20
):
    return db.query(Book).filter(
        (Book.title.ilike(f"%{q}%")) |
        (Book.author.ilike(f"%{q}%"))
    ).offset(skip).limit(limit).all()