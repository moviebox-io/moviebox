import express from 'express';
import Movie from '../model/movies-model';

const api = express.Router(); // eslint-disable-line new-cap

api.get('/movies', (req, res) => {
  Movie.find((err, movies) => {
    if (err) res.send(err);
    res.json(movies);
    return true;
  });
});

api.get('/movie/:id', (req, res) => {
  Movie.findById(req.params.id, (err, movie) => {
    if (err) res.send(err);
    res.json(movie);
  });
});

api.post('/movies', (req, res) => {
  const movie = new Movie();
  movie.name = req.body.name;
  movie.save((err) => {
    if (err) res.send(err);
    res.json({ message: 'Movie created!' });
  });
});

export default api;
