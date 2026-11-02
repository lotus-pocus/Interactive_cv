import "./ShellFooter.css";

// Stand-in for the portfolio's Footer, which renders on every route.
export default function ShellFooter() {
  return (
    <footer className="site-footer">
      <p>© {new Date().getFullYear()} Lotus Tay · Interactive CV test site</p>
    </footer>
  );
}
