import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import babel from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "rollup-plugin-replace";
import image from "@rollup/plugin-image";
import postcss from "rollup-plugin-postcss";

export default {
  input: "./demo/src/index.js",
  output: {
    file: "./demo/dist/bundle.js",
    format: "iife",
    sourcemap: true,
  },
  plugins: [
    image(),
    postcss({
      extensions: [".css"],
    }),
    nodeResolve({
      extensions: [".js"],
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("development"),
      preventAssignment: true,
    }),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
    }),
    commonjs(),
    serve({
      open: true,
      verbose: true,
      contentBase: ["./demo", "./demo/public"],
      host: "localhost",
      port: 3000,
    }),
    livereload({ watch: ["./demo/src", "./demo/public"], delay: 300 }),
  ],
};
