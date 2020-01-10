const files = require.context('.', false, /\d+\.js$/);

export default files.keys().map((key) => files(key).default).sort((a, b) => a.number - b.number);
