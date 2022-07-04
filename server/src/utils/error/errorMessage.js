const BAD_REQUEST = { status: 400, message: 'Bad Request' };
const ALREADY_EXISTS = { status: 400, message: 'Already exists' };
const FIELD_MISSING = { status: 400, message: 'Field missing' };
const NOT_FOUND = { status: 404, message: 'Not found' };
const INTERNAL_SERVER_ERROR = { status: 500, message: 'Internal Server Error' };
const UNKNOWN_ERROR = { status: 500, message: 'Unknown error' };

module.exports = {
	BAD_REQUEST,
	ALREADY_EXISTS,
	FIELD_MISSING,
	NOT_FOUND,
	INTERNAL_SERVER_ERROR,
	UNKNOWN_ERROR,
};
