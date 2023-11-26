import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { Helmet } from "react-helmet";
import App from "./App";

import "@mantine/core/styles.css";
import "@mantine/code-highlight/styles.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<MantineProvider
			defaultColorScheme="dark"
			theme={{
				primaryColor: "orange",
			}}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</MantineProvider>
	</React.StrictMode>
);
