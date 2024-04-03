import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import svg from 'vite-plugin-svgo';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    svg({
      plugins: [
        {
          name: 'cleanupIds',
          params: {
            minify: false,
          },
        },
        {
          name: 'addAttributesToSVGElement',
          params: {
            attributes: [
              { fill: 'currentColor' },
            ],
          },
        },
      ],
    }),
    dts({
      insertTypesEntry: true,
      tsconfigPath: resolve(__dirname, 'tsconfig.json'),
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'CobreComponents',
    },
    rollupOptions: {
      external: [
        'lit',
        'inversify'
      ],
      output: {
        globals: {
          lit: 'lit',
          inversify: 'inversify'
        }
      }
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
