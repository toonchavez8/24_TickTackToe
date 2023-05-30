import { StrictMode } from "react";
import { createRoot } from "react-dom";

const rootElement = document.getElementById("react-root");

const root = createRoot(rootElement);

root.render(
	<StrictMode>
		<h1> hello from react</h1>
	</StrictMode>
);
