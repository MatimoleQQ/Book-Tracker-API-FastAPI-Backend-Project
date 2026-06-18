from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from database import Base, engine, get_db
from models import Book
from schemas import BookCreate, BookResponse

Base.metadata.create_all(bind=engine)

app = FastAPI()