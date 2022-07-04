if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const mongoose = require('mongoose');
const { loadExercisesData } = require('../controllers/exercises');
// const { MONGO_CONNECTION_ERROR } = require('../utils/error');

const MONGO_URL = process.env.MONGO_URL;

const dbClient = mongoose.connection;

dbClient.once('open', () => {
	console.log('Connected to MongoDB');
	try {
		dbClient.db.collection('exercises').count(async (err, count) => {
			if (count == 0) {
				await loadExercisesData();
			}
		});
	} catch (error) {
		console.error(error);
	}
});
dbClient.on('error', err => {
	console.error(err);
});

async function mongoConnect() {
	return await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
	return await mongoose.connection.close();
}

module.exports = { mongoConnect, mongoDisconnect };
