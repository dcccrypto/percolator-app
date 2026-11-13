// Post-build check: the host-gated X-Robots-Tag in routes-manifest.json
// matches only the three percolator-ui vercel.app hosts, using Next's matchHas.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const appRoot = join(__dirname, "..");
const require = createRequire(join(appRoot, "package.json"));
const { matchHas } = require("next/dist/shared/lib/router/utils/prepare-destination");

const manifestPath = join(appRoot, ".next/routes-manifest.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const headerRules = manifest.headers || [];
if (headerRules.length !== 1) {
  throw new Error(`expected 1 header rule, got ${headerRules.length}`);
}
const rule = headerRules[0];
if (rule.source !== "/:path*") {
  throw new Error(`unexpected source: ${rule.source}`);
}
const header = (rule.headers || []).find((h) => h.key === "X-Robots-Tag");
if (!header || !String(header.value).includes("noindex")) {
  throw new Error(`missing noindex X-Robots-Tag: ${JSON.stringify(rule.headers)}`);
}

const yesHosts = [
  "percolator-ui-nu.vercel.app",
  "percolator-ui-khubair-nasirs-projects.vercel.app",
  "percolator-ui-git-master-khubair-nasirs-projects.vercel.app",
];
const noHosts = [
  "percolator.trade",
  "www.percolator.trade",
  "mainnet.percolatorlaunch.com",
  "percolator-launch.vercel.app",
  "localhost",
  "localhost:3100",
  "percolator-ui-nu.vercel.app.evil.com",
  "evil-percolator-ui-nu.vercel.app",
  "percolator-ui-nu.vercel.appx",
];
const paths = ["/", "/trade", "/dashboard"];

function applies(host) {
  const req = { headers: { host } };
  return Boolean(matchHas(req, {}, rule.has || [], rule.missing || []));
}

let failed = 0;
for (const host of yesHosts) {
  for (const path of paths) {
    if (!applies(host)) {
      console.error(`FAIL expected noindex for ${host} ${path}`);
      failed++;
    }
  }
}
for (const host of noHosts) {
  if (applies(host)) {
    console.error(`FAIL unexpected noindex for ${host}`);
    failed++;
  }
}
if (failed) {
  process.exit(1);
}
console.log(
  `ok: noindex for ${yesHosts.length} hosts on ${paths.join(", ")}; absent for ${noHosts.length} other hosts`
);
