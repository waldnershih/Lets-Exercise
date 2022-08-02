const reviewModel = require('../collections/reviews');
const { INTERNAL_SERVER_ERROR } = require('../../utils/error');

async function getReviewsByExerciseId(id, skip, limit) {
	try {
		const reviews = await reviewModel
			.find({ exerciseId: id })
			.select({ __v: 0 })
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(limit)
			.populate({
				path: 'owner',
				select: '-password -email',
				model: 'users',
				populate: {
					path: 'avatar',
					select: 'base64',
					model: 'images',
				},
			})
			.exec();
		return reviews;
	} catch (err) {
		throw INTERNAL_SERVER_ERROR;
	}
}

async function createReviewByExerciseId(id, review) {
	try {
		const newReview = new reviewModel({ ...review, exerciseId: id });
		let createdReview = await reviewModel.create(newReview);

		createdReview = await createdReview.populate({
			path: 'owner',
			select: '-password -email',
			model: 'users',
			populate: {
				path: 'avatar',
				select: 'base64',
				model: 'images',
			},
		});

		return createdReview;
	} catch (err) {
		console.log(err);
		throw INTERNAL_SERVER_ERROR;
	}
}

async function getReviewById(id) {
	try {
		const review = await reviewModel
			.findById(id)
			.select({ __v: 0 })
			.populate({
				path: 'owner',
				select: '-password -email',
				model: 'users',
				populate: {
					path: 'avatar',
					select: 'base64',
					model: 'images',
				},
			})
			.exec();
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
			.select({ __v: 0 })
			.populate({
				path: 'owner',
				select: '-password -email',
				model: 'users',
				populate: {
					path: 'avatar',
					select: 'base64',
					model: 'images',
				},
			})
			.exec();
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

async function getReviewsLengthByExerciseId(id) {
	try {
		const reviewsLength = await reviewModel
			.find({ exerciseId: id })
			.countDocuments();
		return reviewsLength;
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
	getReviewsLengthByExerciseId,
};
