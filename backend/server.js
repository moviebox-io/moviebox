import { version } from '../package.json';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
const debug = require('debug')('moviebox');
import moviesAPI from './routes/movies-api';

// Connect to MongoDB and create/use database
mongoose.connect('mongodb://localhost/moviebox');
// Use native promises - http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise;

const router = express.Router(); // eslint-disable-line new-cap

router.get('/', (req, res) => {
  res.json({ version, test: 30 });
});

const app = express();

// body-parser will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', router);
app.use('/api/', moviesAPI);

const server = app.listen(8000, () => {
  const host = server.address().address;
  const port = server.address().port;
  debug(`App listening at http://${host}:${port}`);
});

export default app;
