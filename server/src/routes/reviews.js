const { Router } = require('express');
const {
	httpGetReviewsByExerciseId,
	httpCreateReviewByExerciseId,
	httpGetReviewById,
	httpUpdateReviewById,
	httpDeleteReviewById,
	httpGetReviewsLengthByExerciseId,
} = require('../controllers/reviews');
const { verifyJWT } = require('../utils/jwt');

const router = Router({ mergeParams: true });

router
	.route('/')
	.get(httpGetReviewsByExerciseId)
	.post(verifyJWT, httpCreateReviewByExerciseId);

router
	.route('/review/:reviewId')
	.get(verifyJWT, httpGetReviewById)
	.put(verifyJWT, httpUpdateReviewById)
	.delete(verifyJWT, httpDeleteReviewById);

router.route('/length').get(httpGetReviewsLengthByExerciseId);

module.exports = router;
