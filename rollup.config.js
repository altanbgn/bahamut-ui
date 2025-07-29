import { defineConfig } from 'rollup'
import { resolve } from 'node:path'
import typescriptEngine from 'typescript'
import typescript from '@rollup/plugin-typescript'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import dts from 'rollup-plugin-dts'
import terser from '@rollup/plugin-terser'

export default defineConfig([
  {
    input: 'src/index.ts',
    output: [
      {
        file: "./dist/index.js",
        format: 'es',
        sourcemap: false
      },
    ],
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript({
        typescript: typescriptEngine,
        tsconfig: './tsconfig.json'
      }),
      postcss({
        include: "./src/index.css",
        extract: resolve('dist/index.css'),
        minimize: true,
      }),
      terser()
    ]
  },
  {
    input: "dist/index.d.ts",
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    external: [/\.css$/],
    plugins: [dts()]
  }
])
