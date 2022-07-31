const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const reviewsModel = require('./reviews');
const uniqueArrayPlugin = require('mongoose-unique-array');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	loveExercises: [
		{
			type: Schema.Types.ObjectId,
			ref: 'exercises',
			// unique: true,
		},
	],
});

UserSchema.post('findOneAndDelete', async doc => {
	if (!doc) return;

	try {
		// remove reviews associated with this user
		await reviewsModel.deleteMany({
			'owner.ownerId': doc._id.toString(),
		});
	} catch (err) {
		throw { status: 500, message: err.message };
	}
});

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
UserSchema.plugin(uniqueArrayPlugin);

module.exports = mongoose.model('users', UserSchema);
