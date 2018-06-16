import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../constants/routes';
import { auth } from '../firebase'; 

const ForgotPasswordPage = () =>
	<div>
		<h1>Forgot Password Page</h1>
		<ForgotPasswordForm/>
	</div>

const INITIAL_STATE = {
	email: '',
	error: null,
}

class ForgotPasswordForm extends Component {
	constructor(props){
		super(props);
		this.state = {...INITIAL_STATE};
	}

	onSubmit = (event) => {
		const {
			email
		} = this.state;

		auth.doPasswordReset(email)
			.then(() => {
				this.setState({...INITIAL_STATE});
			})
			.catch((error) => {
				this.setState({error: error});
			});
	}

	onChange = (event) => {
		if(event.target.name === 'email')
			this.setState({email: event.target.value});
	}

	render(){
		const {
			email,
			error
		} = this.state;

		const isInvalid = email === '';

		return (
			<form onSubmit={this.onSubmit}>
				<input
					value={email}
					name='email'
					type='text'
					onChange={this.onChange}
					placeholder='Email Address'
				/>
				<button disabled={isInvalid} type='submit'>
					Reset My Password
				</button>
				
				{ error && <p>{error.message}</p>}
			</form>
		);
	}
}

const ForgotPasswordLink = () => 
	<p>
		<Link to={routes.FORGOT_PASSWORD}>Forgot Password?</Link>
	</p>

export default ForgotPasswordPage;

export {
	ForgotPasswordLink,
	ForgotPasswordForm
};