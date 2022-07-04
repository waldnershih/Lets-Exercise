const { Router } = require('express');

const router = Router();

router
	.route('/')
	.get(httpGetReviewsByExerciseId)
	.post(httpCreateReviewByExerciseId);

router
	.route('/review/:id')
	.get(httpGetReviewById)
	.patch(httpUpdateReviewById)
	.delete(httpDeleteReviewById);

module.exports = router;
