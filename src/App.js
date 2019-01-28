import React, { Component } from 'react';
import classNames from 'classnames';

import plants from './plants';

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

class App extends Component {
	constructor() {
		super();
		this.state = {
			plants: plants.slice().sort((a, b) => a.name - b.name)
		};
	}

	onSort = e => {
		console.log('on sort');
		console.log(e.target.value);
	};

	render() {
		const { onSort } = this;
		const { plants } = this.state;
		return (
			<div className="app">
				<div className="header">
					<select onChange={onSort}>
						<option value="name">Nom</option>
						<option value="start">Début</option>
						<option value="end">Fin</option>
					</select>
				</div>
				<div className="chart">
					<div className="plants">
						{plants.map(({ id, name, periods }, index) => (
							<div key={id} className="plant">
								<div className="name" title={name}>
									{name}
								</div>
								<div className="periods">
									{Object.keys(periods).map(key => (
										<div
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
