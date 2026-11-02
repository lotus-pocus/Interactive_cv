import "./InlineList.css";

// A real list, shown inline with "|" separators as on the PDF CV.
export default function InlineList({ items, label, className }) {
  return (
    <ul
      className={["icv-inline-list", className].filter(Boolean).join(" ")}
      aria-label={label}
    >
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
