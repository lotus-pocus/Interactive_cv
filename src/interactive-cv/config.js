import { createContext, useContext } from "react";

// Defaults match the portfolio after the merge. The host passes overrides as props.
export const defaultConfig = {
  basePath: "/interactive-cv",
  cvPath: "/cv",
  portfolioUrl: "/",
  pdfUrl: "/Lotus_Tay_CV.pdf",
  contactUrl: null,
};

export const ConfigContext = createContext(defaultConfig);

export function useConfig() {
  return useContext(ConfigContext);
}

// Merges host props over the defaults, ignoring props that weren't passed.
export function resolveConfig(props) {
  const config = { ...defaultConfig };
  for (const key of Object.keys(defaultConfig)) {
    if (props[key] !== undefined) config[key] = props[key];
  }
  config.basePath = config.basePath.replace(/\/+$/, "");
  return config;
}
