"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => SetActiveNotePlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var fs = __toESM(require("fs"));
var OUTPUT_PATH = "/tmp/obsidian-active-note.txt";
var INTERVAL_MS = 1e3;
var SetActiveNotePlugin = class extends import_obsidian.Plugin {
  constructor() {
    super(...arguments);
    this.intervalId = null;
    this.lastWritten = "";
  }
  onload() {
    return __async(this, null, function* () {
      this.intervalId = window.setInterval(() => this.syncActiveNote(), INTERVAL_MS);
      this.registerInterval(this.intervalId);
    });
  }
  onunload() {
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
    }
  }
  syncActiveNote() {
    const file = this.app.workspace.getActiveFile();
    if (!file)
      return;
    const vaultPath = this.app.vault.adapter.basePath;
    const fullPath = `${vaultPath}/${file.path}`;
    if (fullPath === this.lastWritten)
      return;
    const now = /* @__PURE__ */ new Date();
    const timestamp = this.formatTimestamp(now);
    const content = `${timestamp} "${fullPath}"
`;
    try {
      fs.writeFileSync(OUTPUT_PATH, content);
      this.lastWritten = fullPath;
    } catch (e) {
    }
  }
  formatTimestamp(date) {
    const y = date.getFullYear();
    const mo = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    const h = String(date.getHours()).padStart(2, "0");
    const mi = String(date.getMinutes()).padStart(2, "0");
    const s = String(date.getSeconds()).padStart(2, "0");
    return `${y}-${mo}-${d}_${h}:${mi}:${s}`;
  }
};
