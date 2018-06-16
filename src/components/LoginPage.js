import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from './SignUpPage';
import { auth } from '../firebase';
import * as routes from '../constants/routes';
import { ForgotPasswordLink } from './ForgotPasswordPage';

const LoginPage = ({ history }) =>
	<div>
		<h1>Login Page</h1>
		<LoginForm history={history}/>
		<ForgotPasswordLink/>
		<SignUpLink/>
	</div>

const INITIAL_STATE = {
	email: '',
	password: '',
	error: null,
}

class LoginForm extends Component {
	constructor(props){
		super(props);
		this.state = { ...INITIAL_STATE };
	}

	onSubmit = (event) => {
		const {
			email,
			password,
		} = this.state;

		const {
			history,
		} = this.props;

		auth.doLoginWithEmailAndPassword(email, password)
			.then(() => {
				this.setState(() => ({ ...INITIAL_STATE }));
				history.push(routes.HOME);
			})
			.catch((error) => {
				this.setState({error: error});
			});

		event.preventDefault();
	}

	onChange = (event) => {
		switch(event.target.name){
			case 'email':
				this.setState({email: event.target.value});
				break;
			case 'password':
				this.setState({password: event.target.value});
				break;
			default:
				return;
		}
	}

	render(){
		const {
			email,
			password,
			error
		} = this.state;

		const isInvalid = 
			email === '' ||
			password ==='';
		
		return(
			<form onSubmit={this.onSubmit}>
				<input	
					value={email}
					onChange={this.onChange}
					type='text'
					placeholder='Email Address'
					name='email'
				/>
				<input
					value={password}
					onChange={this.onChange}
					type='password'
					placeholder='Password'
					name='password'
				/>
				<button disabled={isInvalid} type='submit'>
					Login
				</button>

				{ error && <p>{error.message}</p> }
			</form>
		);
	}

}

export default withRouter(LoginPage);

export {
	LoginForm,
};