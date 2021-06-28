const path = require('path'); // for cross file path
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'UTF-8'); // to read

const compiled = solc.compile(source, 1); // 1- number of contracts

module.exports = compiled.contracts[":Inbox"];