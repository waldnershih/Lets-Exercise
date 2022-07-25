const passport = require('passport');
const { issueJWT } = require('../utils/jwt');
const { FIELD_MISSING, FAILED_TO_LOGIN } = require('../utils/error');
const {
	registerUser,
	getUserById,
	updateUserById,
	deleteUserById,
} = require('../models/services/users');

/**
 *
 * @param {body:{email,password}} req
 * @param {*} res
 * @param {*} next
 */
async function httpLoginUser(req, res, next) {
	console.log(req.body);
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

/**
 *
 * @param {body:{name,email,password}} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
async function httpRegisterUser(req, res, next) {
	const { name, email, password } = req.body;
	console.log(req.body);

	if (!name || !email || !password) {
		return next(FIELD_MISSING);
	}

	try {
		const registeredUser = await registerUser({ email, name }, password);
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
	const { _id: id } = req.user;
	try {
		const user = await getUserById(id);
		res.status(200).send(user);
	} catch (err) {
		return next(err);
	}
}

// ToDo: unable to update password
async function httpUpdateUserById(req, res, next) {
	const { _id: id } = req.user;
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
	const { _id: id } = req.user;

	try {
		const deletedUserId = await deleteUserById(id);
		res.status(200).send(deletedUserId);
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
