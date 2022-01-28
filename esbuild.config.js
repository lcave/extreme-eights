const path = require("path");
const rails = require("esbuild-rails");
const sass = require("esbuild-plugin-sass");

require("esbuild")
  .build({
    entryPoints: ["application.jsx"],
    bundle: true,
    outdir: path.join(process.cwd(), "app/assets/builds"),
    absWorkingDir: path.join(process.cwd(), "app/javascript"),
    sourcemap: false,
    loader: {
      ".svg": "text",
      ".png": "dataurl",
    },
    watch: {
      onRebuild: (error, result) => {
        if (error) {
          console.error("Build failed:", error);
        } else {
          console.log("Build succeeded", result);
        }
      },
    },
    plugins: [rails(), sass()],
  })
  .catch(() => process.exit(1));
