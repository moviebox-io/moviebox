// Load mongoose package
import mongoose from 'mongoose';

// Create a schema
const MovieSchema = new mongoose.Schema({
  name: String,
  added_at: { type: Date, default: Date.now },
});

// Create a model based on the schema
const Movie = mongoose.model('Movie', MovieSchema);

export default Movie;
