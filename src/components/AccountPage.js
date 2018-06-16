import React from 'react';

import AuthUserContext from './AuthUserContext';
import { ForgotPasswordForm } from './ForgotPasswordPage';
import ChangePasswordForm from './ChangePassword';
import withAuthorization from './withAuthorization';

const AccountPage = () =>
	<AuthUserContext.Consumer>
		{(authUser) => 
			<div>
				<h1>Account: {authUser.email}</h1>
				<ForgotPasswordForm/>
				<ChangePasswordForm/>
			</div>
		}
	</AuthUserContext.Consumer>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);