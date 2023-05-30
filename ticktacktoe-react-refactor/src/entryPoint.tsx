import { StrictMode } from "react";
import { createRoot } from "react-dom";
import App from "./App.js";

const rootElement = document.getElementById("react-root");

const root = createRoot(rootElement);

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
