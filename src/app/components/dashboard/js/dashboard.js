import React from "react";
import Nav from './nav';
import LoginForm from './login_form';
import SignupForm from './signup_form';
import { connect } from "react-redux"
import action_types from "./action-type";

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
	}

	// componentDidMount() {
	// 	if (this.props.dashboard.logged_in) {
	// 		this.props.fetchUserData();
	// 	}
	// }

	render() {
		// let form;
		// switch (this.state.displayed_form) {
		//   case 'login':
		//     form = <LoginForm handle_login={this.handle_login} />;
		//     break;
		//   case 'signup':
		//     form = <SignupForm handle_signup={this.handle_signup} />;
		//     break;
		//   default:
		//     form = null;
		// }

		// return(
		// 	<div>
		// 		<Nav
		// 		  logged_in={this.state.logged_in}
		// 		  display_form={this.display_form}
		// 		  handle_logout={this.handle_logout}
		// 		/>
		// 		{form}
		// 		<h3>
		// 		  {this.props.dashboard.logged_in
		// 		    ? `Hello, ${this.props.dashboard.username}`
		// 		    : 'Please Log In'}
		// 		</h3>
		// 	</div>
		// );
	}
}

const mapStateToProps = (state) => {
	// return {
	// 	dashboard: state,
	// }
};

const mapDispatchToProps = (dispatch) => {
	// return {
	// 	fetchUserData: () => {
	// 		dispatch({
	// 			type: action_types.FETCH_USER_DATA
	// 		})
	// 	},

	// 	handleLogin: (e, data) => {
	// 		e.preventDefault();
	// 		fetch('http:\//localhost:8000/token-auth/', {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json'
	// 			},
	// 			body: JSON.stringify(data)
	// 		})
	// 		.then(res => res.json())
	// 		.then(json => {
	// 			localStorage.setItem('token', json.token);
	// 			this.setState({
	// 				logged_in: true,
	// 				displayed_form: '',
	// 				username: json.user.username
	// 			});
	// 		});
	// 	},

	// 	handleSignup: (e, data) => {
	// 		e.preventDefault();
	// 		fetch('http:\//localhost:8000/dashboard/users/', {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json'
	// 			},
	// 			body: JSON.stringify(data)
	// 		})
	// 		.then(res => res.json())
	// 		.then(json => {
	// 			localStorage.setItem('token', json.token);
	// 			this.setState({
	// 				logged_in: true,
	// 				displayed_form: '',
	// 				username: json.username
	// 			});
	// 		});
	// 	},

	// 	handleLogout: () => {
	// 		localStorage.removeItem('token');
	// 		this.setState({ logged_in: false, username: '' });
	// 	},

	// 	display_form: form => {
	// 		this.setState({
	// 			displayed_form: form
	// 		});
	// 	}
	// }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);




