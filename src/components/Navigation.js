import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../constants/routes';
import SignOutButton from './SignOut';
import AuthUserContext from './AuthUserContext';

const Navigation = ({ authUser }) => ( 
	<AuthUserContext.Consumer>
		{(authUser)  => (authUser ? <NavAuth/> : <NavNoAuth/>)}		
	</AuthUserContext.Consumer>
);

const NavAuth = () => (
	<div>
		<ul>
			<li><Link to={routes.LANDING}>Landing</Link></li>
			<li><Link to={routes.HOME}>Home</Link></li>
			<li><Link to={routes.ACCOUNT}>Account</Link></li>
			<li><SignOutButton/></li>
		</ul>
	</div>
);

const NavNoAuth = () => (
	<div>
		<ul>
			<li><Link to={routes.LANDING}>Landing</Link></li>
			<li><Link to={routes.LOGIN}>Login</Link></li>
		</ul>
	</div>
);

export default Navigation;