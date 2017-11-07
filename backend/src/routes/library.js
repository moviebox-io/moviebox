import express from 'express'
import mongoose from 'mongoose'
import { authRequired } from '../libs/oauth2'

const api = express.Router()
const Movie = mongoose.model('Movie')

api.get('/', authRequired, async (req, res) => {
  res.json(req.user.library)
})

api.post('/', authRequired, async (req, res) => {
  const movie = await Movie.load(req.body.movie_id)
  const result = await req.user.libraryAdd(movie)
  res.json(result.library)
})

api.delete('/:movie_id', authRequired, async (req, res) => {
  const movie = await Movie.load(req.params.movie_id)
  const result = await req.user.libraryRemove(movie)
  res.json(result.library)
})

export default api
