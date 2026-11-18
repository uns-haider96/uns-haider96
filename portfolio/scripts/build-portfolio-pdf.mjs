// Builds the print-first portfolio:
//   scripts/portfolio-pdf/portfolio.html -> public/portfolio/Muhammad_Uns_Haider_Shah_Portfolio.pdf
//
// Every image the HTML references as img/<project>/<name>.jpg is made from the
// matching file in public/figures/<project>/ (png or jpg): resized and
// re-encoded as JPEG so the PDF stays small enough to email. Rendering uses
// headless Chrome/Chromium; set CHROME_PATH if it is not found automatically.
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = resolve(root, "scripts/portfolio-pdf");
const input = resolve(srcDir, "portfolio.html");
const output = resolve(root, "public/portfolio/Muhammad_Uns_Haider_Shah_Portfolio.pdf");

const MAX_WIDTH = 1500; // px; enough for crisp figures at the sizes used on A4
const QUALITY = 80;

const html = readFileSync(input, "utf8");
const refs = [...new Set([...html.matchAll(/src="(img\/[^"]+\.jpg)"/g)].map((m) => m[1]))];

for (const ref of refs) {
  const base = ref.replace(/^img\//, "").replace(/\.jpg$/, "");
  const source = [".png", ".jpg"].map((ext) => resolve(root, "public/figures", base + ext)).find(existsSync);
  if (!source) throw new Error(`No source figure for ${ref} in public/figures`);
  const target = resolve(srcDir, ref);
  mkdirSync(dirname(target), { recursive: true });
  await sharp(source)
    .flatten({ background: "#ffffff" })
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(target);
}
console.log(`Prepared ${refs.length} images`);

const candidates = [
  process.env.CHROME_PATH,
  "/opt/pw-browsers/chromium",
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
    "--virtual-time-budget=10000",
    `--print-to-pdf=${output}`,
    pathToFileURL(input).href,
  ],
  { stdio: "inherit" },
);
console.log(`Wrote ${output}`);
