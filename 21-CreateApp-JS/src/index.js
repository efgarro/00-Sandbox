import React from "react";

import { createRoot } from "react-dom/client";

const domNode = document.getElementById("app");
const root = createRoot(domNode);

import App from "./App";

root.render(<App name="Bella" />);
