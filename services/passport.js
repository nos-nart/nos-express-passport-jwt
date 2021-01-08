const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user.model');
const { config } = require('../config/index');

module.exports = function(passport) {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: config.secretJwt
  }

  passport.use(new jwtStrategy(opts, (payload, done) => {
    User.findOne({ id: payload.id }, (err, user) => {
      if (err) return done(err, false);
      if (user) return done(null, user);
      return done(null, false);
    })
  }))
}
