const { UNKNOWN_ERROR } = require('./errorMessage');

const errorHandler = (err, res, req) => {
	const { status, message } = err;

	// console.log(err);

	switch (err.status) {
		case 400:
		case 404:
		case 500:
			return res.status(status).json(message);
		default:
			return res.status(status).json(UNKNOWN_ERROR);
	}
};

module.exports = errorHandler;
