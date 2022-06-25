import React from "react";
import { Home, NotFound } from "./pages";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import history from "./history";

import "./App.scss";

const App = () => {
	return (
		<Router history={history}>
			<Routes>
				<Route path="/" exact element={<Home />} />
				<Route path="/404" exact element={<NotFound />} />
				<Route path="*" element={<Navigate replace to="/404" />} />
			</Routes>
		</Router>
	);
};

export default App;
