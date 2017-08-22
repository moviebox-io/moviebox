import { tmdbApiKey } from '../config.secure'
import rp from 'request-promise'

const baseUrl = 'https://api.themoviedb.org/3/'
const searchMovieUrl = baseUrl + 'search/movie'
const configurationUrl = baseUrl + 'configuration'
let imageBasePath = ''
let tmdbConfig = {}

export const getConfiguration = async () => {
  const options = { method: 'GET',
    url: configurationUrl,
    qs: {
      api_key: tmdbApiKey
    },
    json: true
  }
  tmdbConfig = await rp(options)
  // [ 'w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original' ]
  imageBasePath = tmdbConfig.images.base_url + 'w154'
}

getConfiguration()

export const searchMovie = async ({query}) => {
  const options = { method: 'GET',
    url: searchMovieUrl,
    qs: {
      api_key: tmdbApiKey,
      query
    },
    json: true
  }
  return rp(options).then(res => {
    res.results.forEach(el => {
      el.poster_path = el.poster_path ? imageBasePath + el.poster_path : ''
    })
    return res
  })
}
