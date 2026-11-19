import fs from 'fs';
import path from 'path';

console.log('Testing bundle in client/dist/assets...');
const distDir = path.resolve('dist/assets');
if (fs.existsSync(distDir)) {
  const files = fs.readdirSync(distDir);
  console.log('Dist files:', files);
} else {
  console.log('dist/assets not found!');
}
