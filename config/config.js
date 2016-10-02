import path from 'path';

const root = path.join(__dirname, '../');
const backend = path.join(__dirname, '../backend');
const nodeModules = path.join(__dirname, '../node_modules');

export default {
  root,
  backend,
  nodeModules,
  alias: {
    '@backend': backend,
  },
  testAlias: {
    '@unit-backend': path.join(root, 'test/unit/backend'),
  },
};
