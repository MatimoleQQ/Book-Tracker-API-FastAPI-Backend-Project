from sqlalchemy import Column, Integer, String, DateTime, Index
from sqlalchemy.sql import func

from database import Base


class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    author = Column(String(255), nullable=False)
    isbn = Column(String(20), nullable=False)
    pages = Column(Integer, nullable=False)
    rating = Column(Integer, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    __table_args__ = (
        Index("idx_books_title", "title"),
        Index("idx_books_author", "author"),
    )