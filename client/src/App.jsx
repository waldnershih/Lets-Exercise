import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Home,
	LoveExercises,
	ExerciseDetail,
	NotFound,
	Signin,
	Signup,
	UserInfo,
	Schedule,
} from './pages';
import { Route, Routes, Navigate } from 'react-router-dom';
import {
	// Footer,
	Header,
	Sidebar,
	Protected,
	ScrollToTop,
} from './components';
import { useLocation } from 'react-router-dom';
import { setIsAuth } from './redux/slices/isAuthSlice';
import { fetchUserProfile } from './redux/slices/userSlice';

import './App.scss';
import { clearUser } from './utils';

const blacklist = ['/signin', '/signup', '/404'];

const App = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const { isAuth } = useSelector(state => state.isAuth);
	const {
		userToken,
		// userProfile
	} = useSelector(state => state.user);

	useEffect(() => {
		clearUser();
	}, []);

	useEffect(() => {
		dispatch(setIsAuth(userToken ? true : false));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userToken]);

	useEffect(() => {
		dispatch(fetchUserProfile());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuth]);

	// useEffect(() => {
	// 	console.log(userProfile);
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [userProfile?._id]);

	return (
		<div className="app">
			<ScrollToTop>
				{!blacklist.includes(location.pathname) && (
					<Header setIsSidebarOpen={setIsSidebarOpen} />
				)}
				{
					<Sidebar
						isSidebarOpen={isSidebarOpen}
						setIsSidebarOpen={setIsSidebarOpen}
					/>
				}
				<Routes>
					<Route path="/" exact element={<Home />} />
					{/* protect route */}

					<Route
						path="/profile/loveexercises"
						element={
							<Protected>
								<LoveExercises />
							</Protected>
						}
					/>

					<Route
						path="/profile/userinfo"
						element={
							<Protected>
								<UserInfo />
							</Protected>
						}
					/>

					<Route
						path="/exercisedetail/:id"
						exact
						element={<ExerciseDetail />}
					/>

					<Route
						path="/schedule"
						element={
							<Protected>
								<Schedule />
							</Protected>
						}
					/>

					<Route path="/signin" exact element={<Signin />} />
					<Route path="/signup" exact element={<Signup />} />
					<Route path="/404" exact element={<NotFound />} />
					<Route path="*" element={<Navigate replace to="/404" />} />
				</Routes>
				{/* {!blacklist.includes(location.pathname) && <Footer />} */}
			</ScrollToTop>
		</div>
	);
};

export default App;
