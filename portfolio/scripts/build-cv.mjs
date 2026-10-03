// Renders scripts/cv/cv.html to public/cv/Muhammad_Uns_Haider_Shah_CV.pdf with
// headless Chrome/Chromium. Set CHROME_PATH if the browser is not on PATH.
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const input = resolve(root, "scripts/cv/cv.html");
const output = resolve(root, "public/cv/Muhammad_Uns_Haider_Shah_CV.pdf");

const candidates = [
  process.env.CHROME_PATH,
  "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "google-chrome",
  "chromium",
  "chromium-browser",
].filter(Boolean);

const chrome = candidates.find((c) => !c.startsWith("/") || existsSync(c));
mkdirSync(dirname(output), { recursive: true });

execFileSync(
  chrome,
  [
    "--headless",
    "--no-sandbox",
    "--disable-gpu",
    "--allow-file-access-from-files",
    "--no-pdf-header-footer",
    `--print-to-pdf=${output}`,
    pathToFileURL(input).href,
  ],
  { stdio: "inherit" },
);
console.log(`Wrote ${output}`);
