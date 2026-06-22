import { useEffect, useState } from "react";
import BookForm from "../components/BookForm";
import BookTable from "../components/BookTable";
import { getBooks, searchBooks } from "../api/booksApi";

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);



  const isSearching = search.trim().length > 0;

  const totalPages = Math.ceil(total / limit);

  const loadBooks = async () => {
      setLoading(true);

      try {
        const res = isSearching
          ? await searchBooks(search, page, limit)
          : await getBooks(sortBy, sortOrder, page, limit);

        setBooks(res?.data?.data ?? res?.data ?? []);
        setTotal(res?.data?.total ?? 0);
      } finally {
        setLoading(false);
      }
  };

 useEffect(() => {
   loadBooks();
 }, [search, page, sortBy, sortOrder, limit]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* HEADER */}
        <div style={styles.header}>
          <h1 style={styles.title}>📚 Book Tracker</h1>
          <p style={styles.subtitle}>Manage your reading list</p>
        </div>

        {/* FORM CARD */}
        <div style={styles.card}>
          <BookForm onAdd={loadBooks} />
        </div>

        {/* TOOLBAR */}
        <div style={styles.toolbar}>
          <input
            style={styles.input}
            placeholder="Search by title or author..."
            onChange={(e) => setSearch(e.target.value)}
          />

          <select style={styles.select} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="id">Newest</option>
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="pages">Pages</option>
            <option value="rating">Rating</option>
          </select>

          <select style={styles.select} value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="desc">Desc</option>
            <option value="asc">Asc</option>
          </select>

          <select
            style={styles.select}
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        {/* CONTENT */}
        <div style={styles.card}>
          {loading && <p style={styles.info}>Loading books...</p>}

          {!loading && books.length === 0 && (
            <p style={styles.info}>No books found.</p>
          )}

          {!loading && books.length > 0 && (
            <>
              <BookTable books={books} />

              {/* PAGINATION */}
              <div style={styles.pagination}>
                <button
                  style={styles.button}
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  Prev
                </button>

                <span style={styles.pageInfo}>
                  Page <b>{page}</b> of <b>{totalPages || 1}</b>
                </span>

                <button
                  style={styles.button}
                  disabled={page >= totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
const styles: any = {
  page:{
   background: "#f9f9f9",
   minHeight: "100vh",
   display: "flex",
   justifyContent: "center",
   padding: "30px",
  },

  container: {
    width: "100%",
    maxWidth: "1400px",
    margin: "0 auto",
  },

  header: {
    marginBottom: "20px",
  },

  title: {
    margin: 0,
    fontSize: "28px",
  },

  subtitle: {
    margin: "5px 0 0",
    color: "#666",
  },

  card: {
    background: "white",
    padding: "16px",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
    marginBottom: "16px",
  },

  toolbar: {
    display: "flex",
    gap: "10px",
    marginBottom: "16px",
    flexWrap: "wrap",
  },

  input: {
    padding: "8px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    flex: 1,
    minWidth: "200px",
    color: "#111",
    background: "white",
  },

  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    marginTop: "15px",
  },

  button: {
    padding: "6px 12px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    background: "white",
    cursor: "pointer",
  },

  pageInfo: {
    fontSize: "14px",
  },

  info: {
    color: "#666",
    textAlign: "center",
  },
  select: {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  background: "white",
  color: "#111",
  outline: "none",
  cursor: "pointer",
  transition: "0.2s",
  },
  title: {
  margin: 0,
  fontSize: "28px",
  color: "#111",
  fontWeight: 700,
  },
};