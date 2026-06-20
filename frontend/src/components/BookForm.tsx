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
  const [errors, setErrors] = useState<string[]>([]);


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


    <>
    {errors.length > 0 && (
      <div>
        {errors.map((err, i) => (
          <p
            key={i}
            style={{
              color: "red",
              margin: "4px 0",
              fontWeight: "bold",
            }}
          >
            {err}
          </p>
        ))}
      </div>
    )}

    <form onSubmit={handleSubmit}>
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

        <BookInput
          name="pages"
          value={form.pages}
          onChange={handleChange}
          placeholder="Pages"
          type="number"
          error={fieldErrors.pages}
        />

        <BookInput
          name="rating"
          value={form.rating}
          onChange={handleChange}
          placeholder="Rating"
          type="number"
          error={fieldErrors.rating}
        />
      <button type="submit">Add Book</button>
    </form>

        {toast && (
          <div
            style={{
              position: "fixed",
              bottom: 20,
              right: 20,
              padding: "12px 16px",
              background: toast.type === "success" ? "green" : "red",
              color: "white",
              borderRadius: 8,
            }}
          >
            {toast.message}
          </div>
        )}
    </>
  );
}