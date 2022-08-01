const userModel = require('../collections/users');
const exerciseModel = require('../collections/exercises');
const imageModel = require('../collections/images');
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
		const user = await userModel
			.findById(id)
			.select({ __v: 0 })
			.populate('avatar')
			.exec();
		return user;
	} catch (err) {
		throw INTERNAL_SERVER_ERROR;
	}
}

async function updateUserById(id, profile) {
	const { avatar, name, email, loveExercise, field } = profile;
	console.log(profile);

	if (email) {
		return await updateUserEmail(id, email);
	}

	if (name) {
		return await updateUserName(id, name);
	}

	if (avatar) {
		return await updateUserAvatar(id, avatar);
	}

	if (!loveExercise) return;

	if (field === 'addLoveExercise') {
		const exercise = await exerciseModel.findById(loveExercise);
		return await addLoveExercise(id, exercise);
	}

	if (field === 'removeLoveExercise') {
		return await removeLoveExercise(id, loveExercise);
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

async function createImage(image) {
	try {
		const newImage = new imageModel(image);
		const savedImage = await newImage.save();
		return savedImage;
	} catch (err) {
		throw INTERNAL_SERVER_ERROR;
	}
}

// update user profile function
async function updateUserName(id, name) {
	try {
		const user = await userModel
			.findByIdAndUpdate(id, { name }, { new: true })
			.select({ __v: 0 })
			.populate('avatar')
			.exec();
		return user;
	} catch (err) {
		throw INTERNAL_SERVER_ERROR;
	}
}

async function updateUserEmail(id, email) {
	try {
		const user = await userModel
			.findByIdAndUpdate(id, { email }, { new: true })
			.select({ __v: 0 })
			.populate('avatar')
			.exec();
		return user;
	} catch (err) {
		throw INTERNAL_SERVER_ERROR;
	}
}

async function updateUserAvatar(id, { name, base64, type }) {
	try {
		const new_avatar = await createImage({ name, base64, type });
		new_avatar.save();

		const updatedUser = await userModel
			.findByIdAndUpdate(
				id,
				{
					avatar: new_avatar,
				},
				{ new: true },
			)
			.select({ __v: 0 })
			.populate('avatar')
			.exec();
		return updatedUser;
	} catch (err) {
		console.log(err);
		throw INTERNAL_SERVER_ERROR;
	}
}

async function addLoveExercise(id, loveExercise) {
	try {
		const user = await userModel.findById(id);
		user.loveExercises.push(loveExercise);
		console.log(user);
		return await user.save();
	} catch (err) {
		console.log(err);
		throw INTERNAL_SERVER_ERROR;
	}
}

async function removeLoveExercise(id, loveExerciseId) {
	try {
		const user = await userModel.findById(id);
		user.loveExercises.pull(loveExerciseId);
		return await user.save();
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
