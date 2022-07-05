const userModel = require('../collections/users');
const { INTERNAL_SERVER_ERROR, ALREADY_EXISTS } = require('../../utils/error');

async function registerUser(user, password) {
	try {
		const newUser = new userModel(user);
		const registeredUser = await userModel.register(newUser, password);
		return registeredUser;
	} catch (err) {
		console.log(err);
		if (
			(err.code && err.code === 11000) ||
			(err.message &&
				err.message ===
					'A user with the given username is already registered')
		) {
			throw ALREADY_EXISTS;
		}
		throw INTERNAL_SERVER_ERROR;
	}
}

async function getUserById(id) {
	try {
		const user = await userModel.findById(id).select({ __v: 0 });
		return user;
	} catch (err) {
		throw INTERNAL_SERVER_ERROR;
	}
}

async function updateUserById(id, user) {
	try {
		const updatedUser = await userModel
			.findByIdAndUpdate(id, user, { new: true })
			.select({ __v: 0 });
		return updatedUser;
	} catch (err) {
		throw INTERNAL_SERVER_ERROR;
	}
}

async function deleteUserById(id) {
	try {
		const deletedUser = await userModel.findByIdAndDelete(id);
		return deletedUser._id;
	} catch (err) {
		throw INTERNAL_SERVER_ERROR;
	}
}

module.exports = {
	registerUser,
	getUserById,
	updateUserById,
	deleteUserById,
};
