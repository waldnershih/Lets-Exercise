const passport = require('passport');

const verifyJwt = passport.authenticate('jwt', { session: false });

module.exports = verifyJwt;
