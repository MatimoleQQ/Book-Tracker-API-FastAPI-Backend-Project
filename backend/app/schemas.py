from pydantic import BaseModel, Field


class BookCreate(BaseModel):
    title: str = Field(min_length=1)
    author: str = Field(min_length=1)
    isbn: str = Field(min_length=10, max_length=13)
    pages: int = Field(gt=0)
    rating: int = Field(ge=1, le=5)


class BookResponse(BaseModel):
    id: int
    title: str
    author: str
    isbn: str
    pages: int
    rating: int

    class Config:
        from_attributes = True


class BookListResponse(BookResponse):
    pass