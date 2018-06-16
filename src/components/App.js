import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import withAuthentication from './withAuthentication';

import Navigation from './Navigation';
import LandingPage from './LandingPage';
import SignUpPage from './SignUpPage';
import LoginPage from './LoginPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import HomePage from './HomePage';
import AccountPage from './AccountPage';

import * as routes from '../constants/routes';

const App = () => 
	<Router>
		<div>
			<Navigation/>
			<hr/>
			<Route exact path={routes.LANDING} component={() => <LandingPage/>}/>
			<Route exact path={routes.SIGN_UP} component={() => <SignUpPage/>}/>
			<Route exact path={routes.LOGIN} component={() => <LoginPage/>}/>
			<Route exact path={routes.FORGOT_PASSWORD} component={() => <ForgotPasswordPage/>}/>
			<Route exact path={routes.HOME} component={() => <HomePage/>}/>
			<Route exact path={routes.ACCOUNT} component={() => <AccountPage/>}/>
		</div>
	</Router>


export default withAuthentication(App);
