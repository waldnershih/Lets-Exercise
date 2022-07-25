export const clearUser = () => {
	const expiresIn = localStorage.getItem('expiresIn');
	if (expiresIn) {
		const now = new Date().getTime();
		const expiresInTime = new Date(expiresIn).getTime();
		if (now > expiresInTime) {
			localStorage.removeItem('token');
			localStorage.removeItem('userId');
			localStorage.removeItem('expiresIn');
		}
	}
};
