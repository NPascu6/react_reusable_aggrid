import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import babel from '@rollup/plugin-babel';
import packageJson from "./package.json" assert { type: "json" };
import image from '@rollup/plugin-image';
import svg from 'rollup-plugin-svg-import';
import copy from 'rollup-plugin-copy';
import svgr from '@svgr/rollup';
import globImport from 'rollup-plugin-glob-import';
import pkg from 'rollup-plugin-glob-import';
import replace from 'rollup-plugin-replace';
import { string } from 'rollup-plugin-string';
import InlineSvg from 'rollup-plugin-inline-svg';
import url from "postcss-url";
const { camelCase } = pkg;


export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss({
        plugins: [
          url({
            url: "inline",
            maxSize: 10,
            fallback: "copy"
          })
        ],
      }),
      terser(),
      image(),
      copy({
        targets: [
          { src: 'src/components/assets/', dest: ['lib/cjs/components/', 'lib/esm/components/'] },
        ],
      }),
      svg({
        // process SVG to DOM Node or String. Default: false
        stringify: false
      }),
      svgr(),
      babel({
        presets: ["@babel/preset-react"],
      }),
      string({
        include: "src/components/assets/**/*.svg"
      }),
      globImport({
        format: 'default',
        rename: (name, id) => name || `${camelCase(basename(dirname(id)))}_${camelCase(basename(id, extname(id)))}`
      }),
      replace({
        ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      }),
      InlineSvg()
    ],
  },
  {
    input: "lib/esm/index.d.ts",
    output: [{ file: "lib/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];