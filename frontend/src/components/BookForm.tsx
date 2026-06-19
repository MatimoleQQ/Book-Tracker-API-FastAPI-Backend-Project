import { useState } from "react";
import { createBook } from "../api/booksApi";


export default function BookForm({ onAdd }: any) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    isbn: "",
    pages: 0,
    rating: 1,
  });
  const [error, setError] = useState("");


  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {

    e.preventDefault();

    setError("");

    if (form.isbn.length < 10) {
      setError("ISBN must contain at least 10 characters");
      return;
    }

    if (form.pages <= 0) {
      setError("Pages must be greater than 0");
      return;
    }

    if (form.rating < 1 || form.rating > 5) {
      setError("Rating must be between 1 and 5");
      return;
    }
    await createBook(form);
    onAdd();
  };

  return (


    <>
    {error && <p>{error}</p>}

    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" onChange={handleChange} />
      <input name="author" placeholder="Author" onChange={handleChange} />
      <input name="isbn" placeholder="ISBN" onChange={handleChange} />
      <input name="pages" type="number" placeholder="Pages" onChange={handleChange} />
      <input name="rating" type="number" min="1" max="5" onChange={handleChange} />

      <button type="submit">Add Book</button>
    </form>
    </>
  );
}