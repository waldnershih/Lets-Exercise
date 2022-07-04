const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

Date.prototype.addHours = function (h) {
	this.setTime(this.getTime() + h * 60 * 60 * 1000);
	return this;
};

const pathToKey = path.join(__dirname, '..', '..', 'keys', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

const issueJWT = user => {
	const _id = user._id;

	const hours = 1;
	const date = new Date();
	const expiresIn = `${hours}h`;

	const payload = {
		sub: _id,
		iat: date.valueOf(),
	};

	const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
		expiresIn: expiresIn,
		algorithm: 'RS256',
	});

	return {
		token: 'Bearer ' + signedToken,
		expires: date.addHours(hours).valueOf(),
	};
};

module.exports = issueJWT;
