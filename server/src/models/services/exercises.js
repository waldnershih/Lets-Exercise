const fs = require('fs');
const path = require('path');
const exercisesModel = require('../collections/exercises');
const { INTERNAL_SERVER_ERROR } = require('../../utils/error');

const exerciseFilePath = path.join(
	__dirname,
	'..',
	'..',
	'..',
	'data',
	'exercises.json',
);

async function readExercisesJson() {
	try {
		let rawdata = fs.readFileSync(exerciseFilePath);
		// exerciseObj = JSON.parse(rawdata);
		return JSON.parse(rawdata);
	} catch (err) {
		console.log(err);
		throw INTERNAL_SERVER_ERROR;
	}
}

async function loadExercisesData() {
	const exerciseObj = await readExercisesJson();
	for (const exercise in exerciseObj) {
		await saveExercise(exerciseObj[exercise]);
	}
}

async function saveExercise(data) {
	const { id, bodyPart, gifUrl, name, target, equipment } = data;
	// console.log(id);
	try {
		await exercisesModel.updateOne(
			{
				id,
				bodyPart,
				gifUrl,
				name,
				target,
				equipment,
			},
			{
				id,
				bodyPart,
				gifUrl,
				name,
				target,
				equipment,
			},
			{ upsert: true }, // only insert if not exists
		);
		console.log('exercise saved');
	} catch (err) {
		console.log(`Could not save exercises ${err}`);
		throw INTERNAL_SERVER_ERROR;
	}
}

async function getAllExercises() {
	try {
		const exercises = await exercisesModel.find(
			{},
			{
				_id: 0,
				__v: 0,
			},
		);
		return exercises;
	} catch (err) {
		console.log(err);
		throw INTERNAL_SERVER_ERROR;
	}
}

async function getExerciseById(id) {
	try {
		const exercise = await exercisesModel.findOne(
			{ id },
			{
				_id: 0,
				__v: 0,
			},
		);
		return exercise;
	} catch (err) {
		console.log(err);
		throw INTERNAL_SERVER_ERROR;
	}
}

async function getExercisesByBodyPart(bodyPart) {
	try {
		const exercises = await exercisesModel.find(
			{ bodyPart },
			{
				_id: 0,
				__v: 0,
			},
		);
		return exercises;
	} catch (err) {
		console.log(err);
		throw INTERNAL_SERVER_ERROR;
	}
}

async function getExercisesByEquipment(equipment) {
	try {
		const exercises = await exercisesModel.find(
			{ equipment },
			{
				_id: 0,
				__v: 0,
			},
		);
		return exercises;
	} catch (err) {
		console.log(err);
		throw INTERNAL_SERVER_ERROR;
	}
}

async function getExercisesByTarget(target) {
	try {
		const exercises = await exercisesModel.find(
			{ target },
			{
				_id: 0,
				__v: 0,
			},
		);
		return exercises;
	} catch (err) {
		console.log(err);
		throw INTERNAL_SERVER_ERROR;
	}
}

module.exports = {
	loadExercisesData,
	getAllExercises,
	getExerciseById,
	getExercisesByBodyPart,
	getExercisesByEquipment,
	getExercisesByTarget,
};
