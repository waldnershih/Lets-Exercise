import React, { useContext } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { BasicCard } from '../index';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useSelector } from 'react-redux';

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
	const { isAuth } = useSelector(state => state.isAuth);
	return (
		<ScrollMenu
			LeftArrow={LeftArrow}
			RightArrow={RightArrow}
			className="app__horizontal-scrollbar"
		>
			{items.map(item => (
				<div key={`${item.name}-${item.id}`}>
					<BasicCard
						exercise={item}
						itemID={`${item.name}-${item.id}`}
						detailLink={`/exercisedetail/${item.id}`}
						isAuth={isAuth}
					/>
				</div>
			))}
		</ScrollMenu>
	);
};

export default HorizontalScrollbar;
