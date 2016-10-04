import path from 'path';

const root = path.join(__dirname, '../');
const backend = path.join(__dirname, '../backend');
const nodeModules = path.join(__dirname, '../node_modules');
const frontendSource = path.join(__dirname, '../frontend/');
const frontendDist = path.join(__dirname, '../dist/frontend/');

export default {
  root,
  backend,
  nodeModules,
  frontend: {
    src: frontendSource,
    dist: frontendDist,
    index: path.join(frontendSource, 'index.html'),
    appRoot: path.join(frontendSource, 'app'),
  },
  alias: {
    '@backend': backend,
  },
  testAlias: {
    '@unit-backend': path.join(root, 'test/unit/backend'),
  },
};
