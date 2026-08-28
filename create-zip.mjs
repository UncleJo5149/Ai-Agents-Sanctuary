import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

async function packageZip() {
  const zip = new JSZip();
  const rootDir = process.cwd();

  const ignoreList = new Set([
    'node_modules',
    'dist',
    '.git',
    '.cache',
    'create-zip.mjs',
    'project-source.tar.gz'
  ]);

  function addFiles(currentDir, relativePath = '') {
    const files = fs.readdirSync(currentDir);

    for (const file of files) {
      if (ignoreList.has(file)) continue;
      if (file.endsWith('.zip')) continue;

      const fullPath = path.join(currentDir, file);
      const relPath = relativePath ? path.join(relativePath, file) : file;
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        addFiles(fullPath, relPath);
      } else {
        const fileData = fs.readFileSync(fullPath);
        zip.file(relPath, fileData);
      }
    }
  }

  console.log('Gathering project files...');
  addFiles(rootDir);

  const publicDir = path.join(rootDir, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const outputZipPath = path.join(publicDir, 'ai-agent-spa-sanctuary.zip');
  console.log('Generating ZIP content...');
  const content = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 }
  });

  fs.writeFileSync(outputZipPath, content);
  const sizeMb = (content.length / (1024 * 1024)).toFixed(2);
  console.log(`Successfully packaged project into: ${outputZipPath} (${sizeMb} MB)`);
}

packageZip().catch(console.error);
