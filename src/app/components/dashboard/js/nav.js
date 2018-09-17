import React from 'react';
import PropTypes from 'prop-types';

export default class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.logged_out_nav = (
            <ul>
                <li onClick={() => this.props.display_form('login')}>login</li>
                <li onClick={() => this.props.display_form('signup')}>signup</li>
            </ul>
        );

        this.logged_in_nav = (
            <ul>
                <li onClick={this.props.handle_logout}>logout</li>
            </ul>
        );
    }


    render() {
        return (

            <div>{this.props.logged_in ? this.logged_in_nav : this.logged_out_nav}
            <p>this is nav</p></div>
        )
    }
}

Nav.propTypes = {
    logged_in: PropTypes.bool.isRequired,
    display_form: PropTypes.func.isRequired,
    handle_logout: PropTypes.func.isRequired
};