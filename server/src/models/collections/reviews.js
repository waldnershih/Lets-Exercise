const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
	{
		description: {
			type: String,
			required: true,
		},
		rating: {
			type: Number,
			min: 1,
			max: 5,
			required: true,
		},
		owner: {
			ownerId: {
				type: String,
				required: true,
				// unique: true,
			},
			ownerName: {
				type: String,
				required: true,
			},
		},
		// id retrieved from exerciseDB API, eg: '0001'
		exerciseId: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model('reviews', ReviewSchema);
