const {
	loadExercisesData,
	getAllExercises,
	getExerciseById,
	getExercisesByBodyPart,
	getExercisesByEquipment,
	getExercisesByTarget,
	getBodyPartList,
} = require('../models/services/exercises');

// const { BAD_REQUEST, FIELD_MISSING } = require('../models/errors');

async function httpGetAllExercises(req, res, next) {
	// ToDo: Pagination
	try {
		const exercises = await getAllExercises();
		res.status(200).json(exercises);
	} catch (err) {
		next(err);
	}
}

async function httpGetExerciseById(req, res, next) {
	const { id } = req.params;
	try {
		const exercise = await getExerciseById(id);
		res.status(200).json(exercise);
	} catch (err) {
		next(err);
	}
}

async function httpGetExercisesByBodyPart(req, res, next) {
	const { bodypart } = req.params;
	try {
		const exercises = await getExercisesByBodyPart(bodypart);
		res.status(200).json(exercises);
	} catch (err) {
		next(err);
	}
}

async function httpGetExercisesByEquipment(req, res, next) {
	const { equipment } = req.params;
	try {
		const exercises = await getExercisesByEquipment(equipment);
		res.status(200).json(exercises);
	} catch (err) {
		next(err);
	}
}

async function httpGetExercisesByTarget(req, res, next) {
	const { target } = req.params;
	try {
		const exercises = await getExercisesByTarget(target);
		res.status(200).json(exercises);
	} catch (err) {
		next(err);
	}
}

async function httpGetBodyPartList(req, res, next) {
	try {
		const bodyPartList = await getBodyPartList();
		res.status(200).json(bodyPartList);
	} catch (err) {
		next(err);
	}
}

module.exports = {
	httpGetAllExercises,
	httpGetExerciseById,
	httpGetExercisesByBodyPart,
	httpGetExercisesByEquipment,
	httpGetExercisesByTarget,
	loadExercisesData,
	httpGetBodyPartList,
};
