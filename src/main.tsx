import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
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
				primaryShade: 7,
				colors: {
					dark: ["#C1C2C5", "#A6A7AB", "#909296", "#5c5f66", "#373A40", "#2C2E33", "#25262b", "#131313", "#141517", "#101113"],
				},
			}}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</MantineProvider>
	</React.StrictMode>
);
