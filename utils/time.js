const formatMinutes = (date) =>
	new Date(date).getMinutes() >= 10
		? new Date(date).getMinutes()
		: `0${new Date(date).getMinutes()}`;

const formatHours = (date) => new Date(date).getHours() - 1;

export const getTimeToDeparture = (date) => {
	let actualDate = new Date().getTime();
	let tweetDate = new Date(date).getTime();
	let time = actualDate - tweetDate;
	let hours = formatHours(time);
	let minutes = formatMinutes(time);

	return hours > 0 && minutes > 0
		? `${hours} hours ${minutes} minutes`
		: hours <= 0 && minutes > 0 && minutes <= 1
		? `${minutes} minute`
		: hours <= 0 && minutes > 1
		? `${minutes} minutes`
		: minutes <= 0 && hours > 1
		? `${hours} hours`
		: `${hours} hour`;
};
