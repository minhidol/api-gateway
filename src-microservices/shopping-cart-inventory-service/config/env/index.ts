var path = require('path');

//const env = 'local';
const env = 'local';
// //const env = process.env.NODE_ENV || 'development';
//const env = process.env.NODE_ENV || 'staging';
// // const env = process.env.NODE_ENV || 'production';
const config = require(`./${env}`); // eslint-disable-line import/no-dynamic-require

// const defaults = {
//   root: path.join(__dirname, '/..')
// };

// export default {
//   config: '123'
// }

export default{
  index: config.default
};