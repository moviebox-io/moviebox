import { version } from '../package.json';
import express from 'express';
const debug = require('debug')('moviebox');

const api = express.Router(); // eslint-disable-line new-cap

api.get('/', (req, res) => {
  res.json({ version, test: 29 });
});

const app = express();
app.use('/api', api);

const server = app.listen(8000, () => {
  const host = server.address().address;
  const port = server.address().port;

  debug(`App listening at http://${host}:${port}`);
});
