import mongoose from 'mongoose'
import findOrCreate from 'mongoose-findorcreate'

const MovieSchema = new mongoose.Schema({
  tmdb_id: Number,
  poster_path: String,
  overview: String,
  release_date: String,
  genre_ids: Array,
  title: String,
  added_at: { type: Date, default: Date.now }
})

MovieSchema.index({tmdb_id: 1}, {unique: true})
MovieSchema.plugin(findOrCreate)

// hot reload mongoose schema
if (process.env.NODE_ENV === 'development') {
  delete mongoose.models.Movie
  delete mongoose.modelSchemas.Movie
}

MovieSchema.statics = {
  ...MovieSchema.statics,
  async load (id) {
    return this.findOne({tmdb_id: id})
  },

  async save (movie) {
    return this.findOneAndUpdate({ tmdb_id: movie.tmdb_id }, movie, { new: true, upsert: true, setDefaultsOnInsert: true })
  }
}

const Movie = mongoose.model('Movie', MovieSchema)

export default Movie
