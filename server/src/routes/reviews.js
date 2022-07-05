const { Router } = require('express');
const {
	httpGetReviewsByExerciseId,
	httpCreateReviewByExerciseId,
	httpGetReviewById,
	httpUpdateReviewById,
	httpDeleteReviewById,
} = require('../controllers/reviews');

const router = Router({ mergeParams: true });

router
	.route('/')
	.get(httpGetReviewsByExerciseId)
	.post(verifyJWT, httpCreateReviewByExerciseId);

router
	.route('/review/:reviewId')
	.get(verifyJWT, httpGetReviewById)
	.patch(verifyJWT, httpUpdateReviewById)
	.delete(verifyJWT, httpDeleteReviewById);

module.exports = router;
