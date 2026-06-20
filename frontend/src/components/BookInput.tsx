type Props = {
  name: string;
  value: any;
  onChange: (e: any) => void;
  placeholder: string;
  error?: string;
  type?: string;
};

export default function BookInput({
  name,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
}: Props) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        style={{
          border: error ? "1px solid red" : "1px solid #ccc",
          padding: "6px",
        }}
      />

      {error && (
        <p style={{ color: "red", margin: 0, fontSize: "12px" }}>
          {error}
        </p>
      )}
    </div>
  );
}