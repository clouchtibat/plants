import React, { Component } from 'react';
import classNames from 'classnames';

import originalPlants from './plants';

import './app.scss';

const months = [
	'Janvier',
	'Février',
	'Mars',
	'Avril',
	'Mai',
	'Juin',
	'Juillet',
	'Aout',
	'Septembre',
	'Octobre',
	'Novembre',
	'Decembre'
];

const unit = Math.floor(100 / 12);

const sortFunctions = {
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
		const periodA = a.periods[period] || [-1, -1];
		const periodB = b.periods[period] || [-1, -1];
		return (periodA[which] - periodB[which]) * (asc ? -1 : 1);
	}
};

const sortMapper = (value, asc) => {
	const [key, which] = value.split('_');
	console.log('sortMapper');
	console.log(key);
	console.log(which);
	switch (key) {
		case 'semis':
		case 'semisDirect':
		case 'repiquage':
		case 'plantage':
		case 'recolte':
			return sortFunctions.date(key, parseInt(which, 10), asc);
		default:
			return sortFunctions.name(asc);
	}
};

class App extends Component {
	constructor() {
		super();
		this.state = {
			sort: 'name',
			asc: false
		};
	}

	onSort = e => {
		console.log('on sort');
		console.log(e.target.value);
		this.setState({ sort: e.target.value });
	};

	onChangeOrder = () => {
		console.log('on change order');
		this.setState({ asc: !this.state.asc });
	};

	render() {
		const { onSort, onChangeOrder } = this;
		const { sort, asc } = this.state;
		console.log('render', sort, asc);
		return (
			<div className="app">
				<div className="header">
					<select onChange={onSort}>
						<option value="name">Nom</option>
						<optgroup label="Semis">
							<option value="semis_0">Début</option>
							<option value="semis_1">Fin</option>
						</optgroup>
						<optgroup label="Semis direct">
							<option value="semisDirect_0">Début</option>
							<option value="semisDirect_1">Fin</option>
						</optgroup>
						<optgroup label="Plantage">
							<option value="plantage_0">Début</option>
							<option value="plantage_1">Fin</option>
						</optgroup>
						<optgroup label="Récolte">
							<option value="recolte_0">Début</option>
							<option value="recolte_1">Fin</option>
						</optgroup>
					</select>
					<button onClick={onChangeOrder}>order</button>
				</div>
				<div className="chart">
					<div className="plants">
						{[...originalPlants].sort(sortMapper(sort, asc)).map(({ id, name, periods }, index) => (
							<div key={id} className="plant">
								<div className="name" title={name}>
									{name}
								</div>
								<div className="periods">
									{Object.keys(periods).map(key => (
										<div
											key={key}
											className={classNames('period', key.toLowerCase())}
											style={{
												width: unit * (periods[key][1] - periods[key][0]) + '%',
												left: unit / 2 + periods[key][0] * unit + '%'
											}}
										/>
									))}
								</div>
							</div>
						))}
					</div>
					<div className="ords">
						{months.map((month, index) => (
							<div key={month} className="month" style={{ width: Math.floor(100 / 12) + '%' }}>
								<div className="name">{month}</div>
								<div className="line" />
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
}

export default App;
