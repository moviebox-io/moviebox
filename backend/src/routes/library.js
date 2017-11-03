import express from 'express'
import mongoose from 'mongoose'
import { authRequired } from '../libs/oauth2'

const api = express.Router()
const Movie = mongoose.model('Movie')
const User = mongoose.model('User')

api.get('/', authRequired, async (req, res) => {
  let user = await User.load(req.user.id)
  res.json(user.library)
})

api.post('/', authRequired, async (req, res) => {
  let user = await User.load(req.user.id)
  const movie = await Movie.load(req.body.movie_id)
  const result = await user.libraryAdd(movie)
  res.json(result.library)
})

api.delete('/:movie_id', authRequired, async (req, res) => {
  let user = await User.load(req.user.id)
  const movie = await Movie.load(req.params.movie_id)
  const result = await user.libraryRemove(movie)
  res.json(result.library)
})

export default api
