const { execSync } = require("child_process");
const path = require("path");

const log = (...args) => console.log("check-ts-errors", ...args);
let everythingIsGood = true;
try {
  const tsConfigPath = path.resolve(__dirname, "../tsconfig.json");
  const cmd = `tsc --pretty false --strictNullChecks true --outDir ./tmp/frontend -p ${tsConfigPath}`;

  frontendBuildFullLog = execSync(cmd, {
    cwd: __dirname,
    encoding: "utf8",
    stdio: [null, null, null],
  }).toString();

  if (frontendBuildFullLog.trim() !== "") {
    everythingIsGood = false;
  }
} catch (e) {
  log("error while ts-check");
  frontendBuildFullLog = (e.output || []).filter(Boolean).join("\n\n");
  everythingIsGood = false;
}

if (everythingIsGood) {
  log("All checks pass!");
} else {
  log("TS Check log Start......");
  log(frontendBuildFullLog);
  log("TS Check log End ......");
  log("There are new TypeScript errors!");
  process.exit(1);
}
