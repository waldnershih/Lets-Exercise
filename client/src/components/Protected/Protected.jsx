import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Protected = ({ children }) => {
	const location = useLocation();
	const navigate = useNavigate();
	const { isAuth } = useSelector(state => state.isAuth);
	useEffect(() => {
		if (!isAuth) {
			navigate('/signin', { replace: true, state: { from: location } });
		}
	}, [isAuth, navigate, location]);

	return children;
};

export default Protected;
