if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const mongoose = require('mongoose');
const { loadExercisesData } = require('../controllers/exercises');
const { db } = require('../models/collections/exercises');

const MONGO_URL = process.env.MONGO_URL;

const dbClient = mongoose.connection;

dbClient.on('open', () => {
	console.log('Connected to MongoDB');
	dbClient.db.collection('exercises').count(async (err, count) => {
		if (count == 0) {
			await loadExercisesData();
		}
	});
});
dbClient.on('error', err => {
	console.error(err);
});

async function mongoConnect() {
	await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
	await mongoose.connection.close();
}

module.exports = { mongoConnect, mongoDisconnect };
