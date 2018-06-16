import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { auth } from '../firebase';

import * as routes from '../constants/routes';

const SignUpPage = ({ history }) =>
	<div>
		<h1>Sign Up Page</h1>
		<SignUpForm history={history}/>
	</div>

const INITIAL_STATE = {
	email: '',
	passOne: '',
	passTwo: '',
	error: null,
}

class SignUpForm extends Component {
	constructor(props){
		super(props);
		this.state = {...INITIAL_STATE};
	}

	onSubmit = (event) => {
		const {
			email,
			passOne,
		} = this.state;

		const {
			history,
		} = this.props;

		auth.doCreateUserWithEmailAndPassword(email, passOne)
			.then( (authUser) => {
				this.setState(() => ({...INITIAL_STATE}));
				history.push(routes.HOME);
			})
			.catch( (error) => {
				this.setState({error: error});
			})
		
		event.preventDefault();
	}

	onChange = (event) => {
		switch(event.target.name){
			case 'email':
				this.setState({email: event.target.value});
				break;
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
			email,
			passOne,
			passTwo,
			error,
		} = this.state;

		const isInvalid = 
			passOne !== passTwo ||
			passOne === '' ||
			email === '';

		return (
			<form onSubmit={this.onSubmit}>
				<input 
					value={email}
					onChange={this.onChange}
					type='text'
					placeholder='Email'
					name='email'
				/>
				<input 
					value={passOne}
					onChange={this.onChange}
					type='password'
					placeholder='Password'
					name='passOne'
				/>
				<input 
					value={passTwo}
					onChange={this.onChange}
					type='password'
					placeholder='Confirm Password'
					name='passTwo'
				/>
				<button disabled={isInvalid} type='submit'>
					Sign Up
				</button>

				{ error && <p>{error.message}</p> }
			</form>
		)
	}
}

const SignUpLink = () => 
	<p>
		Don't have and account?
		{' '}
		<Link to={routes.SIGN_UP}>Sign Up</Link>
	</p>

export default withRouter(SignUpPage);

export {
	SignUpForm,
	SignUpLink
}