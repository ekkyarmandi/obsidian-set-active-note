import { Plugin } from "obsidian";
import * as fs from "fs";

const OUTPUT_PATH = "/tmp/obsidian-active-note.txt";
const INTERVAL_MS = 1000;

export default class SetActiveNotePlugin extends Plugin {
	private intervalId: number | null = null;
	private lastWritten: string = "";

	async onload() {
		this.intervalId = window.setInterval(() => this.syncActiveNote(), INTERVAL_MS);
		this.registerInterval(this.intervalId);
	}

	onunload() {
		if (this.intervalId !== null) {
			window.clearInterval(this.intervalId);
		}
	}

	private syncActiveNote() {
		const file = this.app.workspace.getActiveFile();
		if (!file) return;

		const vaultPath = (this.app.vault.adapter as any).basePath;
		const fullPath = `${vaultPath}/${file.path}`;

		// skip write if same file
		if (fullPath === this.lastWritten) return;

		const now = new Date();
		const timestamp = this.formatTimestamp(now);
		const content = `${timestamp} "${fullPath}"\n`;

		try {
			fs.writeFileSync(OUTPUT_PATH, content);
			this.lastWritten = fullPath;
		} catch {
			// silent fail
		}
	}

	private formatTimestamp(date: Date): string {
		const y = date.getFullYear();
		const mo = String(date.getMonth() + 1).padStart(2, "0");
		const d = String(date.getDate()).padStart(2, "0");
		const h = String(date.getHours()).padStart(2, "0");
		const mi = String(date.getMinutes()).padStart(2, "0");
		const s = String(date.getSeconds()).padStart(2, "0");
		return `${y}-${mo}-${d}_${h}:${mi}:${s}`;
	}
}
