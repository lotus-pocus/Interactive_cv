// Public entry point. The host app mounts:
//   <Route path="/interactive-cv/*" element={<InteractiveCV {...config} />} />
//   <Route path="/cv" element={<CVPage {...config} />} />
// Config props: basePath, cvPath, portfolioUrl, pdfUrl, contactUrl (see config.js).
export { default as InteractiveCV } from "./InteractiveCV";
export { default as CVPage } from "./CVPage";
