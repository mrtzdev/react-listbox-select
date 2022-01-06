import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import css from "rollup-plugin-import-css";
import copy from "rollup-plugin-copy";
import pkg from "./package.json";

export default {
  input: "package/index.js",
  output: {
    file: pkg.main,
    format: "es",
    exports: "auto",
  },
  external: ["react"],
  plugins: [
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
    }),
    resolve(),
    commonjs(),
    css({
      output: "react-listbox-select",
    }),
    copy({
      targets: [{ src: "package/assets/**/*", dest: "dist/assets" }],
    }),
  ],
};
