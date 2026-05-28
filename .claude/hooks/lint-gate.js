const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

let data = '';
process.stdin.on('data', chunk => (data += chunk));
process.stdin.on('end', () => {
  const json = JSON.parse(data);
  const filePath = json.tool_input.file_path;

  if (!/\.(ts|tsx|js|jsx)$/.test(filePath)) process.exit(0);

  const isWin = process.platform === 'win32';
  const eslint = path.join(process.cwd(), 'node_modules/.bin', isWin ? 'eslint.cmd' : 'eslint');

  if (!fs.existsSync(eslint)) process.exit(0);

  const result = spawnSync(eslint, [filePath], { encoding: 'utf8' });

  if (result.status !== 0) {
    process.stdout.write(`ESLint found issues in ${filePath}:\n`);
    if (result.stdout) process.stdout.write(result.stdout);
    if (result.stderr) process.stdout.write(result.stderr);
    process.exit(1);
  }

  process.exit(0);
});
