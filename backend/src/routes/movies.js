import express from 'express'
import mongoose from 'mongoose'
import { searchMovie } from '../libs/tmdb'

const api = express.Router()
const Movie = mongoose.model('Movie')

api.get('/', (req, res) => {
  Movie.find((err, movies) => {
    if (err) throw err
    res.json(movies)
  })
})

api.get('/search', async (req, res) => {
  if (req.query.q) {
    const movies = await searchMovie({ query: req.query.q })
    for (let result of movies.results) {
      let movie = { tmdb_id: result.id }
      const fields = ['poster_path', 'overview', 'release_date', 'genre_ids', 'title']
      fields.forEach(field => { movie[field] = result[field] })
      const savedMovie = await Movie.save(movie)
      result._id = savedMovie._id
    }
    res.json(movies)
  }
})

api.get('/:id', async (req, res) => {
  const movie = await Movie.load(req.params.id)
  res.json(movie)
})

export default api
