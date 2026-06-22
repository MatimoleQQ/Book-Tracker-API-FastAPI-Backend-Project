import { useState, useEffect } from "react";
import { createBook } from "../api/booksApi";
import BookInput from "./BookInput";

export default function BookForm({ onAdd }: any) {
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [form, setForm] = useState({
    title: "",
    author: "",
    isbn: "",
    pages: 0,
    rating: 1,
  });

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "pages" || name === "rating"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setFieldErrors({});
    setToast(null);

    try {
      await createBook(form);

      onAdd();

      setToast({
        type: "success",
        message: "Book created successfully!",
      });

      setForm({
        title: "",
        author: "",
        isbn: "",
        pages: 0,
        rating: 1,
      });

    } catch (err: any) {
      const backendErrors = err.response?.data?.errors;

      if (Array.isArray(backendErrors)) {
        const mapped: Record<string, string> = {};

        backendErrors.forEach((e: string) => {
          const [field, msg] = e.split(":");
          mapped[field.trim()] = msg.trim();
        });

        setFieldErrors(mapped);
      } else {
        setToast({
          type: "error",
          message: "Failed to create book",
        });
      }
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Add New Book</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <BookInput
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            error={fieldErrors.title}
          />

          <BookInput
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="Author"
            error={fieldErrors.author}
          />

          <BookInput
            name="isbn"
            value={form.isbn}
            onChange={handleChange}
            placeholder="ISBN"
            error={fieldErrors.isbn}
          />

           <div style={styles.row}>
          <div style={styles.field}>
            <label>Pages (number of pages)</label>
            <BookInput
              name="pages"
              value={form.pages}
              onChange={handleChange}
              placeholder="e.g. 320"
              type="number"
              error={fieldErrors.pages}
            />
          </div>

          <div style={styles.field}>
            <label>Rating (1–5 stars)</label>
            <BookInput
              name="rating"
              value={form.rating}
              onChange={handleChange}
              placeholder="1-5"
              type="number"
              min="1"
              max="5"
              error={fieldErrors.rating}
            />
          </div>
        </div>

          <button type="submit" style={styles.button}>
            Create Book
          </button>
        </form>
      </div>

      {toast && (
        <div
          style={{
            ...styles.toast,
            background: toast.type === "success" ? "#16a34a" : "#dc2626",
          }}
        >
          {toast.message}
        </div>
      )}
    </div>
  );

}
const styles: any = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    marginTop: "40px",
  },

  card: {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
},

  title: {
    color: "#111",
    marginBottom: "15px",
    fontSize: "20px",
  },

  form: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "12px",
  },

  row: {
    display: "flex",
    gap: "10px",
  },

  button: {
    marginTop: "10px",
    padding: "10px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  toast: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    padding: "12px 16px",
    borderRadius: "8px",
    color: "white",
    fontWeight: "bold",
    transition: "0.3s",
  },
};