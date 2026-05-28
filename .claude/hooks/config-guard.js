const fs = require('fs');
const path = require('path');

let data = '';
process.stdin.on('data', chunk => (data += chunk));
process.stdin.on('end', () => {
  const json = JSON.parse(data);
  const filePath = json.tool_input.file_path;

  if (!/\.(ts|tsx|js|jsx)$/.test(filePath)) process.exit(0);

  const configPath = path.join(process.cwd(), '.claude/config.md');

  if (!fs.existsSync(configPath)) {
    process.stdout.write(
      "Config guard: .claude/config.md not found. Create it with a 'stack:' value (e.g. 'stack: react') before generating code.\n"
    );
    process.exit(2);
  }

  const config = fs.readFileSync(configPath, 'utf8');
  if (!/stack:\s*\S+/.test(config)) {
    process.stdout.write(
      "Config guard: .claude/config.md is missing a 'stack:' value. Add 'stack: react' or 'stack: angular' before generating code.\n"
    );
    process.exit(2);
  }

  process.exit(0);
});
