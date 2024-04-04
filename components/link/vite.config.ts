import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import svg from 'vite-plugin-svgo';
import dts from 'vite-plugin-dts';
import noBundlePlugin from 'vite-plugin-no-bundle';

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
    noBundlePlugin({
      copy: '**/*.css',
      internal: '**/*.svg',
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        '@cobre/cobre-di',
      ],
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
