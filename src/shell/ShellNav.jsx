import "./ShellNav.css";

// Stand-in for the portfolio's Nav: same position and styling, test-site links.
export default function ShellNav() {
  return (
    <nav className="site-nav">
      <a href="/">Home</a>
      <a href="/interactive-cv">Story</a>
      <a href="/cv">CV</a>
      <a href="https://lotus-pocus-portfolio.vercel.app">Portfolio</a>
      <a href="mailto:lotusetay@gmail.com">Contact</a>
    </nav>
  );
}
