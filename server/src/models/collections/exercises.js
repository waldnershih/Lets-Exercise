const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const reviewsModel = require('./reviews');

const ExerciseSchema = new Schema(
	{
		// id retrieved from exerciseDB API
		id: {
			type: String,
			required: true,
			unique: true,
		},
		bodyPart: {
			type: String,
			required: true,
		},
		gifUrl: {
			type: String,
			required: true,
			unique: true,
		},
		name: {
			type: String,
			required: true,
		},
		target: {
			type: String,
			required: true,
		},
		equipment: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
);

ExerciseSchema.post('findOneAndDelete', async doc => {
	if (doc) {
		try {
			// remove reviews associated with this exercise
			await reviewsModel.deleteMany({
				exerciseId: doc.id,
			});
		} catch (err) {
			throw { status: 500, message: err.message };
		}
	}
});

module.exports = mongoose.model('exercises', ExerciseSchema);
