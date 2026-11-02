import { Route, Routes } from "react-router-dom";

import { ConfigContext, resolveConfig } from "./config";
import useRouteFocus from "./hooks/useRouteFocus";
import SiteHeader from "./components/SiteHeader";
import Intro from "./screens/Intro";
import Chapter from "./screens/Chapter";
import Thanks from "./screens/Thanks";
import "./styles/icv.css";

export default function InteractiveCV(props) {
  const config = resolveConfig(props);
  const mainRef = useRouteFocus();

  return (
    <ConfigContext value={config}>
      <div className="icv">
        <SiteHeader />
        <main ref={mainRef} className="icv-main">
          <Routes>
            <Route index element={<Intro />} />
            <Route path="thanks" element={<Thanks />} />
            <Route path=":chapter" element={<Chapter />} />
          </Routes>
        </main>
      </div>
    </ConfigContext>
  );
}
