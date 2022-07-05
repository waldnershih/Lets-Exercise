const {
	getReviewsByExerciseId,
	createReviewByExerciseId,
	getReviewById,
	updateReviewById,
	deleteReviewById,
} = require('../models/services/reviews');

const { BAD_REQUEST, FIELD_MISSING } = require('../utils/error');

async function httpGetReviewsByExerciseId(req, res, next) {
	const { exerciseId } = req.params;

	try {
		const reviews = await getReviewsByExerciseId(exerciseId);
		res.status(200).json(reviews);
	} catch (err) {
		return next(err);
	}
}

async function httpCreateReviewByExerciseId(req, res, next) {
	const { exerciseId } = req.params;
	const { description, star, owner } = req.body;

	console.log(req.params);

	if (!description || !star || !owner.name || !owner.ownerId) {
		return next(FIELD_MISSING);
	}

	if (star < 1 || star > 5) {
		return next(BAD_REQUEST);
	}

	try {
		const review = await createReviewByExerciseId(exerciseId, req.body);
		res.status(201).json(review);
	} catch (err) {
		return next(err);
	}
}

async function httpGetReviewById(req, res, next) {
	const { reviewId } = req.params;
	try {
		const review = await getReviewById(reviewId);
		res.status(200).json(review);
	} catch (err) {
		return next(err);
	}
}

async function httpUpdateReviewById(req, res, next) {
	const { reviewId } = req.params;
	const { description, star, owner } = req.body;

	if (!description || !star || !owner.name || !owner.ownerId) {
		return next(FIELD_MISSING);
	}

	if (star < 1 || star > 5) {
		return next(BAD_REQUEST);
	}

	try {
		const review = await updateReviewById(reviewId, req.body);
		res.status(200).json(review);
	} catch (err) {
		return next(err);
	}
}

async function httpDeleteReviewById(req, res, next) {
	const { reviewId } = req.params;
	try {
		const deletedReviewId = await deleteReviewById(reviewId);
		res.status(200).json(deletedReviewId);
	} catch (err) {
		return next(err);
	}
}

module.exports = {
	httpGetReviewsByExerciseId,
	httpCreateReviewByExerciseId,
	httpGetReviewById,
	httpUpdateReviewById,
	httpDeleteReviewById,
};
