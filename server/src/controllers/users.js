const passport = require('passport');
const { issueJWT } = require('../utils/jwt');
const { FIELD_MISSING, FAILED_TO_LOGIN } = require('../utils/error');
const {
	registerUser,
	getUserById,
	updateUserById,
	deleteUserById,
} = require('../models/services/users');

async function httpLoginUser(req, res, next) {
	passport.authenticate('local', { session: false }, (err, user, info) => {
		if (err) {
			console.log(err);
			return next(err);
		}

		if (!user) {
			return next(FAILED_TO_LOGIN);
		}
		try {
			const jwt = issueJWT(user);
			return res.status(200).send({
				user: user,
				token: jwt.token,
				expiresIn: jwt.expires,
			});
		} catch (err) {
			return next(err);
		}
	})(req, res, next);
}

async function httpRegisterUser(req, res, next) {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(FIELD_MISSING);
	}

	try {
		const registeredUser = await registerUser(email, password);
		const jwt = issueJWT(registeredUser);
		res.status(201).send({
			user: registeredUser,
			token: jwt.token,
			expiresIn: jwt.expires,
		});
	} catch (err) {
		return next(err);
	}
}

async function httpGetUserById(req, res, next) {
	const { id } = req.params;
	try {
		const user = await getUserById(id);
		res.status(200).send(user);
	} catch (err) {
		return next(err);
	}
}

// ToDo: unable to update password
async function httpUpdateUserById(req, res, next) {
	const { id } = req.params;
	const { email, password } = req.body;

	if (!email && !password) {
		return next(FIELD_MISSING);
	}

	try {
		const updatedUser = await updateUserById(id, { email, password });
		res.status(200).send(updatedUser);
	} catch (err) {
		return next(err);
	}
}

async function httpDeleteUserById(req, res, next) {
	const { id } = req.params;
	// const {_id} = req.user;

	try {
		const deletedUser = await deleteUserById(id);
		res.status(200).send(deletedUser);
	} catch (err) {
		return next(err);
	}
}

module.exports = {
	httpLoginUser,
	httpRegisterUser,
	httpGetUserById,
	httpUpdateUserById,
	httpDeleteUserById,
};
