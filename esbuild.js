const fs = require('fs');
const { build } = require('esbuild');
const { copy } = require('esbuild-plugin-copy');

const baseConfig = {
  bundle: true,
  minify: process.env.NODE_ENV === "production",
  sourcemap: process.env.NODE_ENV !== "production",
};

const extensionConfig = {
  ...baseConfig,
  platform: "node",
  mainFields: ["module", "main"],
  format: "cjs",
  entryPoints: ["./src/extension.ts"],
  outfile: "./out/extension.js",
  external: ["vscode"],
  plugins: [
    copy({
      assets: [
        {
          from: ['./node_modules/react/umd/react.production.min.js'],
          to: ['./lib/react.min.js'],
        },
        {
          from: ['./node_modules/react-dom/umd/react-dom.production.min.js'],
          to: ['./lib/react-dom.min.js'],
        },
      ],
    }),
  ],
};

const watchConfig = {
  watch: {
    onRebuild(error, result) {
      console.log("[watch] build started");
      if (error) {
        error.errors.forEach(error =>
          console.error(`> ${error.location.file}:${error.location.line}:${error.location.column}: error: ${error.text}`)
        );
      } else {
        console.log("[watch] build finished");
      }
    },
  },
};

const webviewConfig = {
  ...baseConfig,
  target: "es2020",
  format: "esm",
  entryPoints: ["./src/webview/main.ts"],
  outfile: "./out/webview.js",
};

const reactConfig = {
  ...baseConfig,
  format: "esm",
  target: "es2020",
  entryPoints: fs.readdirSync('./src/views').map(name => `./src/views/${name}/index.jsx`),
  outdir: "./out/views",
  external: [
    'react',
    'react-dom',
  ],
};

(async () => {
  const args = process.argv.slice(2);
  try {
    if (args.includes("--watch")) {
      // Build and watch source code
      console.log("[watch] build started");
      await build({
        ...reactConfig,
        ...watchConfig,
      });
      await build({
        ...extensionConfig,
        ...watchConfig,
      });
      await build({
        ...webviewConfig,
        ...watchConfig,
      });
      console.log("[watch] build finished");
    } else {
      // Build source code
      await build(reactConfig);
      await build(extensionConfig);
      await build(webviewConfig);
      console.log("build complete");
    }
  } catch (err) {
    process.stderr.write(err.stderr);
    process.exit(1);
  }
})();
