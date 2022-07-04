const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
	{
		description: {
			type: String,
			required: true,
		},
		star: {
			type: Number,
			min: 1,
			max: 5,
			required: true,
		},
		owner: {
			id: {
				type: String,
				required: true,
				unique: true,
			},
			name: {
				type: String,
				required: true,
			},
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model('reviews', ReviewSchema);
