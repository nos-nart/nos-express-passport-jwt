const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email address']
    },
    password: {
      type: String,
      required: true,
      trim: true,
      min: [6, 'Too short password!'],
      max: [20, 'Too long password!']
    }
  },
  {
    timestamps: true,
  }
)

UserSchema.pre('save', function(next) {
  const user = this;
  if (this.isModified('password')) {
    bcrypt.hash(user.password, SALT_ROUND, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      return next();
    })
  } else {
    next();
  }
})

UserSchema.methods.comparePassword = function(pw, cb) {
  bcrypt.compare(pw, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = new mongoose.model('User', UserSchema);
