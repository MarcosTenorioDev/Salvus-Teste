import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { ptBR } from "@clerk/localizations";
import { LangProvider } from "./assets/i18n/index.tsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
	throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ToastContainer className="z-[999999999999999999999]"/>
		<ClerkProvider
			publishableKey={PUBLISHABLE_KEY}
			appearance={{
				variables: { colorPrimary: "green" },
			}}
			localization={ptBR}
		>
			<LangProvider>
				<App />
			</LangProvider>
		</ClerkProvider>
	</React.StrictMode>
);
