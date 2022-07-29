function delay(duration) {
	const startTime = Date.now();
	while (Date.now() - startTime < duration) {
		// even loop is blocked
	}
}

module.exports = { delay };
