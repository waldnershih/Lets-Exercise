import React from 'react';
import { Menu, MenuItem } from '@mui/material';

const BasicMenu = ({ children, items, anchorEl, setAnchorEl }) => {
	const open = Boolean(anchorEl);

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			{children}
			{items.length && (
				<Menu
					id="basic-menu"
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					MenuListProps={{
						'aria-labelledby': 'basic-button',
					}}
				>
					{items.map(item => (
						<MenuItem key={item.label} onClick={item.handleOnClick}>
							{item.label}
						</MenuItem>
					))}
				</Menu>
			)}
		</div>
	);
};

export default BasicMenu;
