import React, { useContext } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { Card } from '../index';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';

import './HorizontalScrollbar.scss';

const LeftArrow = () => {
	const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);

	return (
		<div
			disabled={isFirstItemVisible}
			onClick={() => scrollPrev()}
			className="left-arrow"
		>
			<IoIosArrowBack />
		</div>
	);
};

const RightArrow = () => {
	const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);
	return (
		<div
			disabled={isLastItemVisible}
			onClick={() => scrollNext()}
			className="right-arrow"
		>
			<IoIosArrowForward />
		</div>
	);
};

const HorizontalScrollbar = ({ items }) => {
	return (
		<ScrollMenu
			LeftArrow={LeftArrow}
			RightArrow={RightArrow}
			className="app__horizontal-scrollbar"
		>
			{items.map(item => (
				<div
					style={{ margin: '20px 20px' }}
					key={`${item.name}-${item.id}`}
				>
					<Link to={`/exercisedetail/${item.id}`}>
						<Card
							exercise={item}
							itemID={`${item.name}-${item.id}`}
						/>
					</Link>
				</div>
			))}
		</ScrollMenu>
	);
};

export default HorizontalScrollbar;
