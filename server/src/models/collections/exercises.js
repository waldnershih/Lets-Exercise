const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema(
	{
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

module.exports = mongoose.model('exercises', ExerciseSchema);
