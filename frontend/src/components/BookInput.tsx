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
    <div style={{ width:"100%" }}>
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: "10px",
          borderRadius: "8px",
          border: error ? "1px solid red" : "1px solid #ddd",
          color: "#111",
          background: "white",
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