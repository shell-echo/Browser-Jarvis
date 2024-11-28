import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Main from "~/action-popup/main";

import "~/tailwind.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Main />
	</StrictMode>,
);
