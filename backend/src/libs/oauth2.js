import express from 'express'
import passport from 'passport'
import { googleClientId } from '../config.secure'
import GoogleTokenStrategy from 'passport-google-id-token'
import User from '../models/user'

const router = express.Router() // eslint-disable-line new-cap

passport.use(new GoogleTokenStrategy({
  clientID: googleClientId
},
(parsedToken, googleId, done) => {
  User.findOrCreate({google_id: googleId}, function (err, user) {
    return done(err, user)
  })
}
))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, data) => {
    return done(err, data)
  })
})

router.post('/google',
  passport.authenticate('google-id-token'),
  (req, res) => {
    if (req.user) {
      return res.json({user: req.user})
    } else {
      return res.sendStatus(401)
    }
  }
)

export default router
export const authRequired = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.sendStatus(401)
  }
}
