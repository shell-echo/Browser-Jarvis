import { logger } from "@internal/helper";

class ServiceWroker {
	constructor() {
		logger.init();
		// this.onReload();
	}

	/**
	 * onInstalled
	 */
	public onInstalled(details: chrome.runtime.InstalledDetails) {
		logger.info(details);
	}

	/**
	 * onReload
	 */
	public onReload() {
		const ws = new WebSocket("ws://localhost:5173");
		ws.onmessage = (event) => {
			const data = JSON.parse(event.data);
			console.log(event.data);
			if (data.type === "full-reload" || data.type === "update") {
				console.log("[HMR] Reloading extension...");
				chrome.runtime.reload();
			}
		};

		ws.onerror = (error) => {
			console.error("[HMR] WebSocket error:", error);
		};

		ws.onclose = () => {
			console.warn("[HMR] WebSocket connection closed.");
		};
	}
}

const worker = new ServiceWroker();

chrome.runtime.onInstalled.addListener((details) => {
	worker.onInstalled(details);
});