from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from backend.app.database import Base, engine, get_db
from backend.app.models import Book
from backend.app.schemas import BookCreate, BookResponse
from backend.app.routes import router



Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):

    formatted_errors = []

    for error in exc.errors():
        field = error["loc"][-1]
        msg = error["msg"]

        # 🔥 CLEAN UP MESSAGES
        if "String should have at least" in msg:
            msg = msg.replace("String should have at least", "should have at least")

        if "Input should be greater than" in msg:
            msg = msg.replace("Input should be greater than", "should be greater than")

        if "Input should be less than" in msg:
            msg = msg.replace("Input should be less than", "should be less than")

        formatted_errors.append(f"{field}: {msg}")

    return JSONResponse(
        status_code=422,
        content={"errors": formatted_errors},
    )