import { useEffect, useState } from "react";
import BookForm from "../components/BookForm";
import BookTable from "../components/BookTable";
import { getBooks, searchBooks } from "../api/booksApi";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loadBooks = async () => {
    const res = await getBooks();
    setBooks(res.data);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  useEffect(() => {
    if (search) {
      searchBooks(search).then((res) => setBooks(res.data));
    } else {
      loadBooks();
    }
  }, [search]);

  return (
    <div>
      <h1>Book Tracker</h1>

      <BookForm onAdd={loadBooks} />

      <input
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <BookTable books={books} />
    </div>
  );
}