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
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  const totalPages = Math.ceil(total / limit);

  const loadBooks = async () => {
    setLoading(true);
    try {
     const res = await getBooks(
     sortBy,
     sortOrder,
     page,
     limit
     );
     setBooks(res.data.data);
     setTotal(res.data.total);
    } finally {
     setLoading(false);
    }

  };

  useEffect(() => {
   loadBooks();
  }, [sortBy, sortOrder, page, limit]);

  useEffect(() => {
    if (search) {
      searchBooks(search).then((res) => setBooks(res.data));
    } else {
      loadBooks();
    }
  }, [search]);

console.log("total:", total);
console.log("limit:", limit);
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
        <option value="id">Created Date</option>
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="pages">Pages</option>
        <option value="rating">Rating</option>
      </select>

      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>

      <select
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1); // reset strony
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>


        {loading && <p>Loading...</p>}

        {!loading && books.length === 0 && (
          <p>No books found.</p>
        )}

        {!loading && books.length > 0 && (
          <>
            <BookTable books={books} />

            <div>
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Prev
              </button>

              <span>
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
          </>
        )}
    </div>
  );
}