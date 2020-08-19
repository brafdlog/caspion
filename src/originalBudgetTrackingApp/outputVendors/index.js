// import path from 'path';

// const files = require.context('.', true, /\.\/.+\/index\.js$/);
//
// export default files.keys().reduce((acc, key) => {
//   const vendor = files(key);
//   const name = path.basename(path.dirname(key));
//   acc[name] = { name, ...vendor };
//   return acc;
// }, {});
import * as json from './json/index';

export default {
  json: {
    name: 'json',
    ...json
  },
};
