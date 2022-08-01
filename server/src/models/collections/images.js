const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema(
	{
		name: String,
		base64: String,
		type: String,
	},
	{ timestamps: true },
);

module.exports = mongoose.model('images', ImageSchema);
