import { exec } from "child_process";
import path from "path";

import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	server: {
		host: "0.0.0.0",
		port: 5173,
	},
	root: path.resolve(__dirname, "./src"),
	build: {
		rollupOptions: {
			input: {
				main: "src/index.html",
				"action-popup": "src/action-popup.html",
				"service-worker": "src/service-worker.tsx",
			},
			output: {
				entryFileNames: (chunk) => {
					if (chunk.name === "service-worker") {
						return "service-worker.js";
					}
					return "assets/[name].[hash].js";
				},
				chunkFileNames: "assets/[name].[hash].js",
				assetFileNames: "assets/[name].[hash].[ext]",
			},
		},
		outDir: path.resolve(__dirname, "dist"),
		emptyOutDir: true,
		watch: {},
	},
	plugins: [
		react(),
		{
			name: "jarvis",
			buildStart() {
				console.log("\nVite is watching for changes...");
			},
			configureServer(server) {
				server.ws.on("connection", (socket) => {
					console.log("WebSocket connected:", socket || "unknown");
				});
				server.ws.on("message", (message) => {
					console.log("WebSocket message:", message);
				});
				server.ws.on("close", () => {
					console.log("WebSocket closed");
				});
			},
			closeBundle: async () => {
				exec("cp manifest.json dist/manifest.json", (err, stdout, stderr) => {
					if (!err) return;
					console.error("Error executing move command:", stdout, stderr);
				});
			},
			buildEnd() {
				console.log("\nBuild completed!\n");
			},
		},
	],
	resolve: {
		alias: {
			"~": path.resolve(__dirname, "./src"),
			"@shadcn": path.resolve(__dirname, "./shadcn"),
			"@internal": path.resolve(__dirname, "./internal"),
		},
	},
});
