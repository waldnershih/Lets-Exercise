const fs = require('fs');
const path = require('path');
const User = require('../models/collections/users');
const { Strategy: JwtStrtegy, ExtractJwt } = require('passport-jwt');

const pathToKey = path.join(__dirname, '..', 'keys', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = PUB_KEY;
options.algorithms = ['RS256'];

const strategy = new JwtStrtegy(options, (payload, done) => {
	User.findOne({ _id: payload.sub })
		.then(user => {
			if (user) return done(null, user);

			return done(null, false);
		})
		.catch(err => {
			return done(err, null);
		});
});

module.exports = passport => {
	passport.use(strategy);
};
