import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
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
  ],
};
