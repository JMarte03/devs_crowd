const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  fullName: { type: String },
  userName: { type: String, unique: true, sparse: true },
  email: { type: String, unique: true, sparse: true },
  password: { type: String },
  googleId: { type: String, unique: true, sparse: true },
  githubId: { type: String, unique: true, sparse: true },
  avatar: { type: String, required: false, default: 'https://res.cloudinary.com/dmc0lch9y/image/upload/v1740603341/user_k9egpc.png'},
  banner: { type: String, required: false, default: 'https://res.cloudinary.com/dmc0lch9y/image/upload/v1740603869/devscrowd/xxhsr0gangwjvdwa9b4p.png'},
  title: { type: String, required: false, default: ""},
  city: { type: String, required: false, default: ""},
  country: { type: String, required: false, default: ""},
  bio: { type: String, required: false, default: ""},
  following: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', required: false},
  followers: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', required: false},
})


// Password hash middleware.
 
 UserSchema.pre('save', function save(next) {
  const user = this
  if (!user.isModified('password')) { return next() }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err) }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) { return next(err) }
      user.password = hash
      next()
    })
  })
})


// Helper method for validating user's password.

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch)
  })
}


module.exports = mongoose.model('User', UserSchema)