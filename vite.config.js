import pluginMetaUrl from "@uppercod/vite-meta-url";
import loadCss from "@uppercod/vite-meta-url-load-css";

/**@type {import("vite").UserConfig} */

const config = {
  assetsInclude: ["./src/tailwindcss.css"],
  esbuild: {
    jsxFactory: "_jsx",
    jsxInject: `import {h as _jsx, css as _css} from 'atomico'`,
  },
  build: {
    target: "esnext",
    polyfillModulePreload: false,
  },
  css: false,
  plugins: [
    pluginMetaUrl({
      css: loadCss(),
      md: true,
      woff: true
    }),
  ],
};

export default config;