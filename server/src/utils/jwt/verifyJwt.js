const passport = require('passport');

const varifyJwt = passport.authenticate('jwt', { session: false });

module.exports = varifyJwt;
