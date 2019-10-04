import React, { Component } from "react";
import config from "./config";
import Navbar from "./components/navbar.jsx";
import Form from "./components/form.jsx";
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

class App extends Component {
	state = {
		appTitle: config.appTitle,
		alert: false,
		isLoggedIn: false,
		firestoreData: false,
		todos: [],
	};
	
	handleSearchAyah( surah, ayahFrom, ayahTo ) {
		console.log(surah);
		console.log(ayahFrom);
		console.log(ayahTo);
		
	}
	
	render() {
		const appTitle = this.state.appTitle;
		const { user, signInWithGoogle, signOut } = this.props;
		
		return (
			<React.Fragment>
				<Navbar 
					appTitle = { appTitle } 
					user = { user } 
					signInWithGoogle = { signInWithGoogle } 
					signOut = { signOut } 
				/>
				<div className="container my-3">
					<div className="col-md-8 offset-md-2">
						<Form
							app = { this }
							config = { config }
							onSearchAyah = { this.handleSearchAyah }
						/>
					</div>
				</div>
			</React.Fragment>
		)
	}
}

// init the firebase
const firebaseApp = firebase.initializeApp( config.firebase );
const firebaseAppAuth = firebaseApp.auth();
const providers = {	googleProvider: new firebase.auth.GoogleAuthProvider() };

// export with firebase auth
export default withFirebaseAuth( { providers, firebaseAppAuth } ) ( App );