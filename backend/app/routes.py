from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.app.database import get_db
from backend.app.models import Book
from backend.app.schemas import BookCreate, BookResponse

router = APIRouter()
@router.get("/books", response_model=list[BookResponse])
def get_books(
        sort_by: str = "id",
        db: Session = Depends(get_db)
):
    return db.query(Book).order_by(getattr(Book, sort_by)).all()

@router.post("/books", response_model=BookResponse)
def create_book(book: BookCreate, db: Session = Depends(get_db)):
    db_book = Book(**book.dict())
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book

@router.get("/books/search", response_model=list[BookResponse])
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

@router.get("/health")
def health():
    return {"status": "ok"}