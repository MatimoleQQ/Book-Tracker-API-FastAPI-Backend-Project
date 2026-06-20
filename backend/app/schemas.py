from pydantic import BaseModel, Field,  constr, conint, ConfigDict

class BookCreate(BaseModel):
    title: constr(min_length=1)  # title required
    author: constr(min_length=1)  # author required
    isbn: constr(min_length=10, max_length=13)
    pages: conint(gt=0)
    rating: conint(ge=1, le=5)


class BookResponse(BaseModel):
    id: int
    title: str
    author: str
    isbn: str
    pages: int
    rating: int

    model_config = ConfigDict(from_attributes=True)


class BookListResponse(BookResponse):
    pass