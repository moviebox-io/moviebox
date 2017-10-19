import express from 'express'
import Movie from '../model/movie'
import { searchMovie } from '../libs/tmdb'

const api = express.Router() // eslint-disable-line new-cap

api.get('/', (req, res) => {
  Movie.find((err, movies) => {
    if (err) res.send(err)
    res.json(movies)
    return true
  })
})

api.get('/search', async (req, res) => {
  if (req.query.q) {
    const movie = await searchMovie({ query: req.query.q }).catch(err => {
      res.status(500).send(err.message)
    })
    res.json(movie)
  } else {
    Movie.findById(req.query.id, (err, movie) => {
      if (err) res.send(err)
      res.json(movie)
    })
  }
})

api.post('/', (req, res) => {
  const movie = new Movie()
  movie.name = req.body.name
  movie.save((err) => {
    if (err) res.send(err)
    res.json({ message: 'Movie created!' })
  })
})

export default api
