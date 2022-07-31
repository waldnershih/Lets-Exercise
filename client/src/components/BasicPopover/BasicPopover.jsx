import React, { useMemo } from 'react';
import Popover from '@mui/material/Popover';

import './BasicPopover.scss';

const BasicPopover = ({
	anchorEl,
	setAnchorEl,
	title,
	handleOnYesClick,
	handleOnNoClick,
}) => {
	const open = Boolean(anchorEl);
	const id = useMemo(() => (open ? 'simple-popover' : undefined), [open]);

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Popover
			id={id}
			open={open}
			anchorEl={anchorEl}
			onClose={handleClose}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left',
			}}
		>
			<div className="warning-container">
				<p className="p-text-16">{title}</p>
				<div className="option-container">
					<p onClick={handleOnYesClick}>Yes</p>
					<p onClick={handleOnNoClick}>No</p>
				</div>
			</div>
		</Popover>
	);
};

export default BasicPopover;
