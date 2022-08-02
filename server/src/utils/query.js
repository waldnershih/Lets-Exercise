const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_LIMIT = 0; // mongo will return all documents if limit is 0

// paginated query
function getPagination(query) {
	const page = Math.ceil(Math.abs(query.page)) || DEFAULT_PAGE_NUMBER;
	const limit = Math.ceil(Math.abs(query.limit)) || DEFAULT_PAGE_LIMIT;
	const skip = (page - 1) * limit;

	return {
		skip,
		limit,
	};
}

module.exports = {
	getPagination,
};
