const mongoose = require('mongoose');
const mongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
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

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', UserSchema);
