import React, { Component } from 'react';
import classNames from 'classnames';

import { months, periods, unit } from './constants';
import { sortMapper } from './utils';
import originalPlants from './plants';

import './app.scss';

class App extends Component {
	constructor() {
		super();

		const displays = {};
		periods.forEach(({ id }) => {
			displays[id] = true;
		});

		this.state = {
			sort: 'name',
			asc: false,
			displays
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

	onSearch = e => {
		console.log('on search');
		console.log(e.target.value);
		this.setState({ search: e.target.value });
	};

	onSearchReset = () => {
		console.log('on search reset');
		this.setState({ search: '' });
	};

	onCheck = param => {
		console.log('check init');
		return e => {
			console.log('check change');
			console.log(param);
			this.setState({
				displays: {
					...this.state.displays,
					[param]: !this.state.displays[param]
				}
			});
		};
	};

	render() {
		const { onSort, onChangeOrder, onCheck, onSearchReset, onSearch } = this;
		const { sort, asc, displays, search } = this.state;
		console.log('render', sort, asc, this.state);
		const regex = search ? RegExp(`.*${search}.*`, 'i') : false;

		const plants = [...originalPlants]
			.filter(
				e =>
					(regex ? regex.test(e.name.toLowerCase()) : true) && Object.keys(e.periods).find(f => !!displays[f])
			)
			.sort(sortMapper(sort, asc));

		return (
			<div className="app">
				<div className="header">
					<div className="container inline search">
						<span className="label">Rechercher:</span>
						<input type="text" className="input" value={search} onChange={onSearch} />
						<button className={classNames('button reset', { asc })} onClick={onSearchReset}>
							&times;
						</button>
					</div>
					<div className="container inline">
						<span className="label">Trier par:</span>
						<select className="select" onChange={onSort}>
							<option value="name">Nom</option>
							{periods.map(({ id, name }) => (
								<optgroup label={name}>
									<option value={id + '_0'}>Début</option>
									<option value={id + '_1'}>Fin</option>
								</optgroup>
							))}
						</select>
						<button className={classNames('button order', { asc })} onClick={onChangeOrder}>
							&darr;
						</button>
					</div>

					<div className="container period-choices">
						<span className="label">Afficher:</span>
						{periods.map(({ id, name }) => (
							<div
								key={id}
								className={classNames('period-choice', id.toLowerCase(), { selected: displays[id] })}
								onClick={onCheck(id)}
							>
								{name}
							</div>
						))}
					</div>
				</div>
				<div className="chart">
					<div className="plants">
						{plants.map(({ id, name, periods }, index) => (
							<div
								key={id}
								className={classNames('plant', {
									displayed: Object.keys(periods).find(e => displays[e])
								})}
							>
								<div className="name" title={name}>
									{name}
								</div>
								<div className="periods">
									{Object.keys(periods).map(key => (
										<div
											key={key}
											className={classNames('period', key.toLowerCase(), {
												displayed: displays[key]
											})}
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
								<div className="name top">{month}</div>
								<div className="line" />
								<div className="name">{month}</div>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
}

export default App;
