import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import { CVPage, InteractiveCV } from "./interactive-cv";
import ShellNav from "./shell/ShellNav";
import ShellFooter from "./shell/ShellFooter";
import Home from "./shell/Home";

// Test shell only. Mirrors how the portfolio will mount the module:
// /interactive-cv has no portfolio Nav; /cv and everything else keeps it.
const cvConfig = {
  basePath: "/interactive-cv",
  cvPath: "/cv",
  portfolioUrl: "/",
  pdfUrl: "https://lotus-pocus-portfolio.vercel.app/Lotus_Tay_CV.pdf",
  contactUrl: "mailto:lotusetay@gmail.com",
};

function SiteChrome() {
  return (
    <>
      <ShellNav />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={`${cvConfig.basePath}/*`}
          element={<InteractiveCV {...cvConfig} />}
        />
        <Route element={<SiteChrome />}>
          <Route path="/" element={<Home {...cvConfig} />} />
          <Route path={cvConfig.cvPath} element={<CVPage {...cvConfig} />} />
        </Route>
      </Routes>
      <ShellFooter />
    </BrowserRouter>
  );
}

export default App;
