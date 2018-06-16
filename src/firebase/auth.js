import { auth } from './firebase';

//signup
export const doCreateUserWithEmailAndPassword = (email, password) => 
    auth.createUserWithEmailAndPassword(email, password);

//login
export const doLoginWithEmailAndPassword = (email, password) => 
    auth.signInWithEmailAndPassword(email, password);

//sign out
export const doSignOut = () =>
    auth.signOut();

//password reset
export const doPasswordReset = (email) => 
    auth.sendPasswordResetEmail(email);