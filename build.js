import { build } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

async function runBuild() {
  console.log('🚀 Starting Diamond Master Extension Build...');

  const distDir = path.resolve('dist');
  if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true, force: true });
  }
  fs.mkdirSync(distDir, { recursive: true });

  // 1. Build Popup
  console.log('📦 Building Popup...');
  await build({
    root: path.resolve('src/popup'),
    base: './',
    build: {
      outDir: distDir,
      emptyOutDir: false,
      rollupOptions: {
        input: path.resolve('src/popup/popup.html'),
        output: {
          entryFileNames: 'popup.js',
          assetFileNames: (assetInfo) => {
            if (assetInfo.name && assetInfo.name.endsWith('.css')) return 'popup.css';
            return 'assets/[name]-[hash].[ext]';
          }
        }
      }
    }
  });

  // 2. Build Content Script (IIFE for standalone content script execution)
  console.log('📦 Building Content Script...');
  await build({
    configFile: false,
    build: {
      outDir: distDir,
      emptyOutDir: false,
      lib: {
        entry: path.resolve('src/content/content.ts'),
        name: 'DiamondMasterContent',
        formats: ['iife'],
        fileName: () => 'content.js'
      }
    }
  });

  // 3. Build Background Service Worker
  console.log('📦 Building Background Service Worker...');
  await build({
    configFile: false,
    build: {
      outDir: distDir,
      emptyOutDir: false,
      lib: {
        entry: path.resolve('src/background/serviceWorker.ts'),
        name: 'DiamondMasterBackground',
        formats: ['es'],
        fileName: () => 'background.js'
      }
    }
  });

  // 4. Copy Manifest and Icons
  console.log('📋 Copying Manifest and Assets...');
  fs.copyFileSync(path.resolve('public/manifest.json'), path.join(distDir, 'manifest.json'));

  const iconsSrc = path.resolve('public/icons');
  const iconsDist = path.join(distDir, 'icons');
  if (fs.existsSync(iconsSrc)) {
    fs.cpSync(iconsSrc, iconsDist, { recursive: true });
  }

  console.log('✨ Build succeeded! Extension ready in: ' + distDir);
}

runBuild().catch((err) => {
  console.error('❌ Build failed:', err);
  process.exit(1);
});
