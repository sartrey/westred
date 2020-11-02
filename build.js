const path = require('path');
const epiiRender = require('@epiijs/render');

const config = {
  path: {
    root: path.join(__dirname, 'source'),
    source: 'client',
    target: 'static',
  }
};

if (process.env.NODE_ENV === 'development') {
  epiiRender.watch(config);
} else {
  epiiRender.build(config);
}