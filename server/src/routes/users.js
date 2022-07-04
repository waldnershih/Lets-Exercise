const { Router } = require('express');

const router = Router();

// router.route('/').post(httpCreateUser);
router.route('/login').post(httpAuthentication);
router.route('/register').post(httpRegisterUser);
router
	.route('/user/:id')
	.get(httpGetUserById)
	.patch(httpUpdateUserById)
	.delete(httpDeleteUserById);

module.exports = router;
