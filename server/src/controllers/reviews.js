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
	const { description, rating } = req.body;
	const { _id: ownerId, name: ownerName } = req.user;

	if (!description || !rating || !ownerName || !ownerId) {
		return next(FIELD_MISSING);
	}

	if (rating < 1 || rating > 5) {
		return next(BAD_REQUEST);
	}

	const review = {
		description,
		rating,
		owner: {
			ownerId,
			ownerName,
		},
	};

	try {
		const createdReview = await createReviewByExerciseId(
			exerciseId,
			review,
		);
		res.status(201).json(createdReview);
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
	const { description, rating } = req.body;
	const { _id: ownerId, name: ownerName } = req.user;

	if (!description || !rating || !ownerName || !ownerId) {
		return next(FIELD_MISSING);
	}

	if (rating < 1 || rating > 5) {
		return next(BAD_REQUEST);
	}

	const review = {
		description,
		rating,
		owner: {
			ownerId,
			ownerName,
		},
	};

	try {
		const updatedReview = await updateReviewById(reviewId, review);
		res.status(200).json(updatedReview);
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
