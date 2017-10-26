import express from 'express'
import session from 'express-session'
import morgan from 'morgan'
import mongoose from 'mongoose'
import chalk from 'chalk'
import passport from 'passport'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import oauth2 from './libs/oauth2'
import { version } from '../package.json'
import { sessionSecret } from './config.secure'
import fs from 'fs'
import { join } from 'path'

// Bootstrap models
const models = join(__dirname, './models')
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^.].*\.js$/))
  .forEach(file => require(join(models, file)))

const app = express()

app.set('port', process.env.EXPRESS_PORT || 3000)
app.set('hostname', process.env.EXPRESS_HOSTNAME || 'localhost')

const mongodbHostname = process.env.MONGODB_HOSTNAME ? process.env.MONGODB_HOSTNAME : 'localhost'
const mongodbUri = `mongodb://${mongodbHostname}/moviebox`

mongoose.connection.on('open', (ref) => {
  return console.log(chalk.green('Connected to mongo server!'))
})

mongoose.connection.on('error', (err) => {
  console.log(chalk.red('Could not connect to mongo server!'))
  return console.log(chalk.red(err.message))
})

mongoose.connect(mongodbUri, {
  useMongoClient: true
})
// Use native promises - http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
  mongoose.set('debug', true)
}

const sessionConfig = {
  resave: false,
  saveUninitialized: false,
  secret: sessionSecret
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(session(sessionConfig))

app.use(passport.initialize())
app.use(passport.session())

app.use(cors())

app.get('/', (req, res) => {
  return res.json({ version })
})

app.use('/auth', oauth2)

// Bootstrap routes
const routes = join(__dirname, './routes')
fs.readdirSync(routes)
  .filter(file => ~file.search(/^[^.].*\.js$/))
  .forEach(file => {
    const loaded = require(join(routes, file)).default
    const name = file.split('.')[0]
    app.use(`/${name}`, loaded)
  })

app.use((err, req, res, next) => {
  console.error(chalk.red(err.stack))
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: err
  })
})

app.use((req, res) => {
  return res.status(404).send('Not Found')
})

app.listen(app.get('port'), (err) => {
  if (err) {
    console.log(err)
    return
  }
  const host = app.get('hostname')
  const port = app.get('port')
  console.log(chalk.green(`> Listening at http://${host}:${port}\n`))
})

export default app
