import { useEffect, useState } from "react";
import BookForm from "../components/BookForm";
import BookTable from "../components/BookTable";
import { getBooks, searchBooks } from "../api/booksApi";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("id");

  const loadBooks = async () => {
    const res = await getBooks(sortBy);
    setBooks(res.data);
  };

  useEffect(() => {
    loadBooks();
  }, [sortBy]);

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
      <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="id">Newest</option>
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="rating">Rating</option>
        <option value="pages">Pages</option>
      </select>

      <BookTable books={books} />
    </div>
  );
}