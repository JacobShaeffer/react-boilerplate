import React, { Component } from 'react';

import { auth } from '../firebase';

const INITIAL_STATE = {
	passOne: '',
	passTwo: '',
	error: null,
};

class PasswordChangeForm extends Component {
	constructor(props) {
		super(props);

		this.state = { ...INITIAL_STATE };
	}

	onSubmit = (event) => {
		const { passwordOne } = this.state;

		auth.doPasswordUpdate(passwordOne)
		.then(() => {
			this.setState({ ...INITIAL_STATE });
		})
		.catch(error => {
			this.setState({error: error});
		});

		event.preventDefault();
	}

	onChange = (event) => {
		switch(event.target.name){
			case 'passOne':
				this.setState({passOne: event.target.value});
				break;
			case 'passTwo':
				this.setState({passTwo: event.target.value});
				break;
			default:
				return;
		}
	}

	render() {
		const {
			passOne,
			passTwo,
			error,
		} = this.state;

		const isInvalid =
			passOne !== passTwo ||
			passOne === '';

		return (
			<form onSubmit={this.onSubmit}>
				<input
					value={passOne}
					onChange={this.onChange}
					type='password'
					placeholder='New Password'
					name='passOne'
				/>
				<input
					value={passTwo}
					onChange={this.onChange}
					type='password'
					placeholder='Confirm New Password'
					name='passTwo'
				/>
				<button disabled={isInvalid} type='submit'>
					Reset My Password
				</button>

				{ error && <p>{error.message}</p> }
			</form>
		);
	}
}

export default PasswordChangeForm;