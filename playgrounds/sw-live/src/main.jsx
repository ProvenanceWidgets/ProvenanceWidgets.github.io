import "primereact/resources/themes/lara-light-cyan/theme.css";

import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PrimeReactProvider } from "primereact/api/api.esm.js";
import { ProvenanceProvider } from "provenance-widgets";

import App from "./App.jsx";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PrimeReactProvider>
      <ProvenanceProvider>
        <App />
      </ProvenanceProvider>
    </PrimeReactProvider>
  </StrictMode>,
);
