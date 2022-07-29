import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import './VerticalScrollbarWithTimeout.scss';

const delay = 2; // 1 second delay

let loadMoreItemsTimeout;

const VerticalScrollbarWithTimeout = ({ items }) => {
	const [loadItems, setLoadItems] = useState([]);
	const [hasMore, setHasMore] = useState(true);

	useEffect(() => {
		return () => {
			if (loadMoreItemsTimeout) {
				clearTimeout(loadMoreItemsTimeout);
			}
		};
	}, []);

	useEffect(() => {
		if (items.length > 0) {
			if (items.length < 5) {
				setLoadItems(items);
				setHasMore(false);
			} else {
				setLoadItems(items.slice(0, 5));
				setHasMore(true);
			}
		} else {
			setLoadItems([]);
			setHasMore(false);
		}
	}, [items]);

	const handleLoadMoreItems = () => {
		if (loadMoreItemsTimeout) {
			clearTimeout(loadMoreItemsTimeout);
		}
		loadMoreItemsTimeout = setTimeout(() => {
			setLoadItems([
				...loadItems,
				...items.slice(loadItems.length, loadItems.length + 5),
			]);
			setHasMore(items.length > loadItems.length + 5);
		}, delay * 1000);
	};

	return (
		<InfiniteScroll
			pageStart={0}
			loadMore={handleLoadMoreItems}
			hasMore={hasMore}
			loader={
				<div className="app__vertical-scrollbar__loader" key={0}>
					<p className="p-text-18">Loading ...</p>
				</div>
			}
			// useWindow={false}
			className="app__vertical-scrollbar"
		>
			{loadItems}
		</InfiniteScroll>
	);
};

export default VerticalScrollbarWithTimeout;
