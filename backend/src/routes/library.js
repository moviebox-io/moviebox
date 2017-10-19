import express from 'express'
import User from '../model/user'
import { authRequired } from '../libs/oauth2'

const api = express.Router() // eslint-disable-line new-cap

const getCurrentUserUser = async (req, res) => {
  return User.findOne({_id: req.user.id}, (err, user) => {
    if (err) res.send(err)
    return user
  })
}

api.get('/', authRequired, async (req, res) => {
  let user = await getCurrentUserUser(req, req)
  res.json(user.library)
})

api.post('/', authRequired, async (req, res) => {
  let user = await getCurrentUserUser(req, req)
  user.library.add(req.body.id)
  user.save((err) => {
    if (err) res.send(err)
    res.json({ message: 'Movie added to Library' })
  })
})

api.delete('/:id', authRequired, async (req, res) => {
  let user = await getCurrentUserUser(req, req)
  user.library.remove(req.params.id)
  user.save((err) => {
    if (err) res.send(err)
    res.json({ message: 'Movie removed from Library' })
  })
})

export default api
