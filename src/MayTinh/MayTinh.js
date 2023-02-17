import React, { Component } from 'react';
import './MayTinh.css';
export default class MayTinh extends Component {

	
	state = { result: '' };
	ops = ['/', '*', '+', '-'];

	//Nhập
	AppendValue = val => {
		//Kiểm tra
		if (this.state.result === '0' && val !== '.') this.Clear();
		if ((this.state.result === '0' && this.ops.slice(0, 3).includes(val)) || 
			(this.state.result === '' && this.ops.slice(0, 3).includes(val)) || 
			(this.ops.includes(val) && this.ops.includes(this.state.result.slice(-1))) || 
			(val === '.' && this.state.result.slice(-1) === '.') || 
			this.state.result === 'Infinity' || 
			this.state.result === 'NaN') {
			return;
		}

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

	render() {
		return (
			<div className='calculator'>
				<div className='title'>Calculator</div>
				<div className='display'>
					<div id='CurResult'>{this.state.result || 0}</div>
				</div>
				<div className='button btnAC btnDark' onClick={() => this.Clear()}>AC</div>
				<div className='button btnDEL btnDark' onClick={() => this.Delete()}>DEL</div>
				<div className='button btnDivi btnDark' onClick={() => this.AppendValue('/')}>
					<i className='bi bi-slash-lg'></i>
				</div>
				<div className='button btn7' onClick={() => this.AppendValue(7)}>7</div>
				<div className='button btn8' onClick={() => this.AppendValue(8)}>8</div>
				<div className='button btn9' onClick={() => this.AppendValue(9)}>9</div>
				<div className='button btnMult btnDark' onClick={() => this.AppendValue('*')}>
					<i className='bi bi-x-lg'></i>
				</div>
				<div className='button btn4' onClick={() => this.AppendValue(4)}>4</div>
				<div className='button btn5' onClick={() => this.AppendValue(5)}>5</div>
				<div className='button btn6' onClick={() => this.AppendValue(6)}>6</div>
				<div className='button btnSub btnDark' onClick={() => this.AppendValue('-')}>
					<i className='bi bi-dash-lg'></i>
				</div>
				<div className='button btn1' onClick={() => this.AppendValue(1)}>1</div>
				<div className='button btn2' onClick={() => this.AppendValue(2)}>2</div>
				<div className='button btn3' onClick={() => this.AppendValue(3)}>3</div>
				<div className='button btnAdd btnDark' onClick={() => this.AppendValue('+')}>
					<i className='bi bi-plus-lg'></i>
				</div>
				<div className='button btn0' onClick={() => this.AppendValue(0)}>0</div>
				<div className='button btnDot' onClick={() => this.AppendValue('.')}>.</div>
				<div className='button btnEqual' onClick={() => this.Compute()}>
					<i className='bi bi-pause'></i>
				</div>
			</div>
		);
	}
}
