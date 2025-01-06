import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import postcss from 'rollup-plugin-postcss'
import vue from 'rollup-plugin-vue'
import { babel } from '@rollup/plugin-babel';

export default {
    input: 'src/main.js',
    output: {
        dir: 'output',
        format: 'cjs'
    },
    plugins: [
        peerDepsExternal(),
        resolve(),
        commonjs(),
        typescript({ useTsconfigDeclarationDir: true }),
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: tag => tag === 'teleport'
                }
            }
        }),
        postcss({
            minimize: true,
            modules: true,
            use: {
                sass: null,
                stylus: null,
                less: { javascriptEnabled: true }
            }, 
            extract: true
        }),
        babel({ babelHelpers: 'bundled' })
    ]
};