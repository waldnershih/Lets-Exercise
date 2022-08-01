import React from 'react';
import { Menu, MenuItem } from '@mui/material';

import './BasicMenu.scss';

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
					className="basic-menu"
				>
					{items.map(item => (
						<MenuItem
							key={item.label}
							onClick={item.handleOnClick}
							className="basic-menu__item"
						>
							{item.icon}
							<p className="p-text-16">{item.label}</p>
						</MenuItem>
					))}
				</Menu>
			)}
		</div>
	);
};

export default BasicMenu;
