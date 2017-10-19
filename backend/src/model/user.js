import mongoose from 'mongoose'
import findOrCreate from 'mongoose-findorcreate'

const UserSchema = new mongoose.Schema({
  google_id: String,
  added_at: { type: Date, default: Date.now },
  library: [ { type: mongoose.Schema.ObjectId, ref: 'Movie' } ]
})

UserSchema.index({google_id: 1}, {unique: true})
UserSchema.index({library: 1})
UserSchema.plugin(findOrCreate)

// hot reload mongoose schema
if (process.env.NODE_ENV === 'development') {
  delete mongoose.models.User
  delete mongoose.modelSchemas.User
}

const User = mongoose.model('User', UserSchema)

export default User
