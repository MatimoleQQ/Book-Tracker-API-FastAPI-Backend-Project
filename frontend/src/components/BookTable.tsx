import type { Book } from "../types/book";

export default function BookTable({ books }: { books: Book[] }) {
  return (
    <div style={{ overflowX: "auto", width: "100%" }}>
      <table style={styles.table}>
        <colgroup>
          <col style={{ width: "30%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "15%" }} />
        </colgroup>

        <thead>
          <tr>
            <th style={styles.th}>Title</th>
            <th style={styles.th}>Author</th>
            <th style={styles.th}>ISBN</th>
            <th style={styles.th}>Pages</th>
            <th style={styles.th}>Rating</th>
          </tr>
        </thead>

        <tbody>
          {books.map((b) => (
            <tr key={b.id} style={styles.tr}>
              <td style={styles.td} title={b.title}>
                {b.title}
              </td>

              <td style={styles.td} title={b.author}>
                {b.author}
              </td>

              <td style={styles.td} title={b.isbn}>
                {b.isbn}
              </td>

              <td style={styles.td}>
                <span style={styles.badge}>{b.pages}</span>
              </td>

              <td style={styles.td}>
                <span style={styles.rating}>{b.rating} ⭐</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles: any = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    tableLayout: "fixed",
  },

  th: {
    textAlign: "left",
    padding: "12px",
    borderBottom: "1px solid #eee",
    color: "#111",
    fontWeight: 600,
    fontSize: "14px",
  },

  td: {
    padding: "12px",
    borderBottom: "1px solid #f5f5f5",
    color: "#333",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontSize: "14px",
  },

  tr: {
    transition: "0.15s",
    cursor: "default",
  },

  badge: {
    background: "#f3f4f6",
    padding: "4px 8px",
    borderRadius: "6px",
    fontSize: "12px",
  },

  rating: {
    background: "#fff7ed",
    padding: "4px 8px",
    borderRadius: "6px",
    fontSize: "12px",
    color: "#c2410c",
    fontWeight: "bold",
  },
};