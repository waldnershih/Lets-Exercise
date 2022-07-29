import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import './BasicVerticalScrollbar.scss';

const BasicVerticalScrollbar = ({ length, handleLoadMoreItems, items }) => {
	const [hasMore, setHasMore] = useState(true);

	useEffect(() => {
		if (items.length < length) {
			return setHasMore(true);
		}
		setHasMore(false);
	}, [items, length]);

	return (
		<InfiniteScroll
			pageStart={1}
			loadMore={handleLoadMoreItems}
			hasMore={hasMore}
			loader={
				<div className="app__vertical-scrollbar__loader" key={0}>
					<p className="p-text-18">Loading ...</p>
				</div>
			}
			className="app__vertical-scrollbar"
		>
			{items}
		</InfiniteScroll>
	);
};

export default BasicVerticalScrollbar;
