# Set Active Note

An Obsidian plugin that automatically tracks the active note by writing its full path to `/tmp/obsidian-active-note.txt` every second.

## How It Works

The plugin polls the active note every 1 second. When the active note changes, it writes the new note's full path to `/tmp/obsidian-active-note.txt`.

Output format:

```
2026-04-17_21:11:36 "/Users/ekkyarmandi/Notes/05-INBOX/my-note.md"
```

The file only updates when the active note changes -- no redundant writes.

## Use Case

Allows external tools (scripts, CLI tools, editors) to know which Obsidian note is currently active by reading a simple text file.

## Installation

1. Copy the `set-active-note` folder into your vault's `.obsidian/plugins/` directory
2. Open Obsidian Settings -- Community plugins -- Enable "Set Active Note"
3. The plugin starts tracking immediately

## Development

```bash
# install dependencies
npm install

# build
npm run build
```

After building, reload Obsidian to pick up changes.

## Files

| File | Purpose |
|------|---------|
| `main.ts` | Plugin source code |
| `manifest.json` | Plugin metadata |
| `styles.css` | Styling (currently unused) |
| `esbuild.config.mjs` | Build configuration |
