const reviewModel = require('../collections/reviews');
const { INTERNAL_SERVER_ERROR, ALREADY_EXISTS } = require('../../utils/error');

async function getReviewsByExerciseId(id) {
	try {
		const reviews = await reviewModel
			.find({ exerciseId: id })
			.select({ __v: 0 });
		return reviews;
	} catch (err) {
		throw INTERNAL_SERVER_ERROR;
	}
}

async function createReviewByExerciseId(id, review) {
	try {
		const newReview = new reviewModel({ ...review, exerciseId: id });
		const createdReview = await reviewModel.create(newReview);
		return createdReview;
	} catch (err) {
		console.log(err);
		throw INTERNAL_SERVER_ERROR;
	}
}

async function getReviewById(id) {
	try {
		const review = await reviewModel.findById(id).select({ __v: 0 });
		return review;
	} catch (err) {
		console.log(err);
		throw INTERNAL_SERVER_ERROR;
	}
}

async function updateReviewById(id, review) {
	try {
		const updatedReview = await reviewModel
			.findByIdAndUpdate(id, review, { new: true })
			.select({ __v: 0 });
		return updatedReview;
	} catch (err) {
		throw INTERNAL_SERVER_ERROR;
	}
}

async function deleteReviewById(id) {
	try {
		const deletedReview = await reviewModel.findByIdAndDelete(id);
		return deletedReview._id;
	} catch (err) {
		throw INTERNAL_SERVER_ERROR;
	}
}

module.exports = {
	getReviewsByExerciseId,
	createReviewByExerciseId,
	getReviewById,
	updateReviewById,
	deleteReviewById,
};
