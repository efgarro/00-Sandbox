import * as React from "react";

import { createRoot } from "react-dom/client";

const domNode = document.getElementById("app") as HTMLElement;
const root = createRoot(domNode);

import App from "./App";

root.render(<App name="Bella" />);