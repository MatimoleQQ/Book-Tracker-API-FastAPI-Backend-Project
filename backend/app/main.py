from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.app.database import Base, engine, get_db
from backend.app.models import Book
from backend.app.schemas import BookCreate, BookResponse
from backend.app.routes import router

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(router)