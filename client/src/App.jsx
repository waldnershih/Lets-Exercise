import React, { useState } from 'react';

import { Home, ExerciseDetail, NotFound } from './pages';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Footer, Header, Sidebar } from './components';
import { useLocation } from 'react-router-dom';

import './App.scss';

const App = () => {
	const isAuth = true;
	const location = useLocation();
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	return (
		<div className="app">
			{location.pathname !== '/404' && <Header setIsSidebarOpen={setIsSidebarOpen} />}
			{isSidebarOpen && <Sidebar setIsSidebarOpen={setIsSidebarOpen} />}
			<Routes>
				<Route path="/" exact element={<Home isAuth={isAuth} />} />
				<Route
					path="/exercisedetail/:id"
					exact
					element={<ExerciseDetail isAuth={isAuth} />}
				/>
				<Route path="/404" exact element={<NotFound />} />
				<Route path="*" element={<Navigate replace to="/404" />} />
			</Routes>
			{location.pathname !== '/404' && <Footer />}
		</div>
	);
};

export default App;
