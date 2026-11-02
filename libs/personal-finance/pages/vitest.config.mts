import { defineConfig } from 'vitest/config';

export default defineConfig(() => ({
  root: import.meta.dirname,
  cacheDir: '../../../node_modules/.vite/libs/personal-finance/pages',
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    name: 'personal-finance-pages',
    watch: false,
    globals: true,
    environment: 'node',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../../coverage/libs/personal-finance/pages',
      provider: 'v8' as const,
    }
  },
}));
