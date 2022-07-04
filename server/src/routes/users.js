const { Router } = require('express');
const {
	httpLoginUser,
	httpRegisterUser,
	httpGetUserById,
	httpUpdateUserById,
	httpDeleteUserById,
} = require('../controllers/users');
const { verifyJWT } = require('../utils/jwt');

const router = Router();

router.route('/login').post(httpLoginUser);
router.route('/register').post(httpRegisterUser);
router
	.route('/user/:id')
	.get(verifyJWT, httpGetUserById)
	.patch(verifyJWT, httpUpdateUserById)
	.delete(verifyJWT, httpDeleteUserById);

//  testing jwtToken purpose
router.get('/protected', verifyJWT, (req, res, nest) => {
	res.status(200).send({ id: req.user._id, message: 'you are authorised' });
});

module.exports = router;
