const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const reviewsModel = require('./reviews');

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
			bodyPart: String,
			exercises: { type: Schema.Types.ObjectId, ref: 'exercises' },
		},
	],
});

UserSchema.post('findOneAndDelete', async doc => {
	if (doc) {
		try {
			// remove reviews associated with this user
			await reviewsModel.deleteMany({
				'owner.ownerId': doc._id.toString(),
			});
		} catch (err) {
			throw { status: 500, message: err.message };
		}
	}
});

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('users', UserSchema);
