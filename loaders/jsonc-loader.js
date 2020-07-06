const { stripComments } = require('jsonc-parser');

module.exports = function loader(input) {
  const rawSource = input.toString();
  const json = JSON.stringify(JSON.parse(stripComments(rawSource))).replace('`', '\\`');
  return `module.exports = JSON.parse(\`${json}\`);`;
};