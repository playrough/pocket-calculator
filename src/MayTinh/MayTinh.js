import React, { Component } from 'react';
import './MayTinh.css';
export default class MayTinh extends Component {
	state = { result: '' };
	ops = ['/', '*', '+', '-'];

	//Nhập
	AppendValue = val => {
		//Kiểm tra
		if (this.state.result === '0' && val !== '.') this.Clear();

		const disallowedConditions = [
			this.state.result === '0' && this.ops.slice(0, 3).includes(val),
			this.state.result === '' && this.ops.slice(0, 3).includes(val),
			this.ops.includes(val) && this.ops.includes(this.state.result.slice(-1)),
			val === '.' && this.state.result.slice(-1) === '.',
			this.state.result === 'Infinity',
			this.state.result === 'NaN',
		];

		if (disallowedConditions.some(condition => condition)) return;

		this.setState(previousResult => ({ result: previousResult.result.toString() + val.toString() }));
	};

	//Tính
	Compute = () => {
		if (this.ops.includes(this.state.result.slice(-1))) return;

		//Tính
		let res;
		try {
			// eslint-disable-next-line
			res = eval(this.state.result).toString();
		} catch (error) {
			alert('error!');
			res = '';
		}

		this.setState({ result: res });
	};

	//Xóa hết
	Clear = () => {
		this.setState({ result: '' });
	};

	//Xóa 1 ký tự
	Delete = () => {
		//Xóa hết nếu là Infinity hoặc NaN
		if (this.state.result === 'Infinity' || this.state.result === 'NaN') {
			this.Clear();
			return;
		}

		//Xóa 1 ký tự
		let value = this.state.result.slice(0, -1);
		this.setState({ result: value });
	};

	calculatorButtons = [
		{ class: 'btnAC btnDark', action: () => this.Clear() },
		{ class: 'btnDEL btnDark', action: () => this.Delete() },
		{ class: 'btnDivi btnDark', action: () => this.AppendValue('/'), label: <i className="bi bi-slash-lg"></i> },
		{ class: 'btn7', action: () => this.AppendValue(7), label: 7 },
		{ class: 'btn8', action: () => this.AppendValue(8), label: 8 },
		{ class: 'btn9', action: () => this.AppendValue(9), label: 9 },
		{ class: 'btnMult btnDark', action: () => this.AppendValue('*'), label: <i className="bi bi-x-lg"></i> },
		{ class: 'btn4', action: () => this.AppendValue(4), label: 4 },
		{ class: 'btn5', action: () => this.AppendValue(5), label: 5 },
		{ class: 'btn6', action: () => this.AppendValue(6), label: 6 },
		{ class: 'btnSub btnDark', action: () => this.AppendValue('-'), label: <i className="bi bi-dash-lg"></i> },
		{ class: 'btn1', action: () => this.AppendValue(1), label: 1 },
		{ class: 'btn2', action: () => this.AppendValue(2), label: 2 },
		{ class: 'btn3', action: () => this.AppendValue(3), label: 3 },
		{ class: 'btnAdd btnDark', action: () => this.AppendValue('+'), label: <i className="bi bi-plus-lg"></i> },
		{ class: 'btn0', action: () => this.AppendValue(0), label: 1 },
		{ class: 'btnDot', action: () => this.AppendValue('.'), label: '.' },
		{ class: 'btnEqual', action: () => this.Compute(), label: <i className="bi bi-pause"></i> },
	];

	render() {
		return (
			<div className="calculator">
				<div className="title">Calculator</div>
				<div className="display">
					<div id="CurResult">{this.state.result || 0}</div>
				</div>

				{this.calculatorButtons.map((button, index) => (
					<div key={index} className={`button ${button.class}`} onClick={button.action}>
						{button.label}
					</div>
				))}
			</div>
		);
	}
}
