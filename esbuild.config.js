const esbuild = require('esbuild');

esbuild.build({
    entryPoints: ['./src/index.ts'],
    bundle: true,
    outfile: './dist/index.js',
    platform: 'node',
}).catch(() => process.exit(1));
