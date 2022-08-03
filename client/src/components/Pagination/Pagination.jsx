import React from 'react';
import Pagination from '@mui/material/Pagination';
import { theme, ThemeProvider } from '../../utils/theme';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/exerciseSlice';

import './Pagination.scss';

const CustomisePagination = ({ count }) => {
	const dispatch = useDispatch();

	const handleChange = (event, value) => {
		dispatch(setCurrentPage(value));
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
					sx={{
						button: {
							margin: '2px',
						},
					}}
				/>
			</ThemeProvider>
		</div>
	);
};

export default CustomisePagination;
