import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import css from "rollup-plugin-import-css";
import copy from "rollup-plugin-copy";
import pkg from "./package.json";
import replace from "rollup-plugin-replace";
import { terser } from "rollup-plugin-terser";

/// to do: add dev server ...

const env = process.env.NODE_ENV;

export default {
  input: "package/index.js",
  output: [
    {
      file: pkg.main,
      format: "cjs",
    },
    {
      file: pkg.module,
      format: "esm",
    },
  ],
  external: Object.keys(pkg.peerDependencies),
  plugins: [
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
    }),
    resolve(),
    replace({
      "process.env.NODE_ENV": JSON.stringify(env),
      preventAssignment: true,
    }),
    commonjs(),
    env === "production" && terser(),
    css({
      output: "react-listbox-select",
    }),
    copy({
      targets: [{ src: "package/assets/**/*", dest: "dist/assets" }],
    }),
  ],
};
