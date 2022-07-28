import React from 'react';
import Pagination from '@mui/material/Pagination';
import { theme, ThemeProvider } from '../../utils/theme';

import './Pagination.scss';

const CustomisePagination = ({ count, setCurrentPage }) => {
	const handleChange = (event, value) => {
		setCurrentPage(value);
	};

	return (
		<div className="app__pagination">
			<ThemeProvider theme={theme}>
				<Pagination
					count={count}
					color="secondary"
					onChange={handleChange}
					defaultValue={1}
					showFirstButton
					showLastButton
				/>
			</ThemeProvider>
		</div>
	);
};

export default CustomisePagination;
