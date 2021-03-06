import { periods } from './constants';

export const sortFunctions = {
	name: asc => (a, b) => {
		let result = 0;
		if (a.name < b.name) {
			result = -1;
		}
		if (a.name > b.name) {
			result = 1;
		}
		return result * (asc ? -1 : 1);
	},
	date: (period, which, asc) => (a, b) => {
		const periodA = a.periods[period];
		const periodB = b.periods[period];
		if (periodA && periodB) {
			return (periodA[which] - periodB[which]) * (asc ? -1 : 1);
		}
		if (!periodA) {
			return 1;
		}
		if (!periodB) {
			return -1;
		}
		return 0;
	}
};

export const sortMapper = (value, asc) => {
	const [key, which] = value.split('_');
	console.log('sortMapper');
	console.log(key);
	console.log(which);
	if (periods.find(p => p.id === key)) {
		return sortFunctions.date(key, parseInt(which, 10), asc);
	}
	return sortFunctions.name(asc);
};
