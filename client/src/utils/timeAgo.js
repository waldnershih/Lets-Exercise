import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en);
const timeAgoJS = new TimeAgo('en-US');

const formatByString = dateString => {
	return timeAgoJS.format(Date.parse(dateString));
};

const formatByDate = date => {
	return timeAgoJS.format(date);
};

const timeAgo = { formatByString, formatByDate };
export default timeAgo;
