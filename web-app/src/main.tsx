import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./App.css";

// biome-ignore lint/style/noNonNullAssertion: The app root element *must* exist for anything to work
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
