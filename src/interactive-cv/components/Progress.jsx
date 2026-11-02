import "./Progress.css";

export default function Progress({ current, total }) {
  return (
    <p className="icv-progress">
      Chapter {current} of {total}
    </p>
  );
}
