import esbuild from "esbuild";

esbuild.build({
	entryPoints: ["main.ts"],
	bundle: true,
	outfile: "main.js",
	external: ["obsidian"],
	format: "cjs",
	platform: "node",
	target: "es2016",
	logLevel: "info",
}).catch(() => process.exit(1));
