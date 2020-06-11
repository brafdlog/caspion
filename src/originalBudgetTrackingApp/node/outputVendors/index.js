const files = require.context('.', true, /\.\/.+\/index\.js$/);

export default files.keys().map((key) => files(key));
