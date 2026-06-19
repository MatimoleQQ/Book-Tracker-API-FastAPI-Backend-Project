import type { Book } from "../types/book";

export default function BookTable({ books }: { books: Book[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>ISBN</th>
          <th>Pages</th>
          <th>Rating</th>
        </tr>
      </thead>

      <tbody>
        {books.map((b) => (
          <tr key={b.id}>
            <td>{b.title}</td>
            <td>{b.author}</td>
            <td>{b.isbn}</td>
            <td>{b.pages}</td>
            <td>{b.rating}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}