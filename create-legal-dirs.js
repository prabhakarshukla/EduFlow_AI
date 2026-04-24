const fs = require('fs');
const path = require('path');

const dirs = [
  'app/license',
  'app/terms',
  'app/privacy'
];

dirs.forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`Created ${fullPath}`);
  }
});
