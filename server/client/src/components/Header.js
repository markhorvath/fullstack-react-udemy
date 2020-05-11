import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li><a href="/auth/google">Login with Google</a></li>
        )
      default:
      //keys were just added to prevent error, since it's a 1-time render any key is fine
        return [
          <li key="1"><Payments /></li>,
          <li style={{ margin: '0 10px'}} key="3">Credits: {this.props.auth.credits}</li>,
          <li key="2"><a href="/api/logout">Logout</a></li>
        ];
    }

  }

  render() {
    console.log('Header this.props: ', this.props);
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? '/surveys' : '/'}
            className="left brand-logo"
          >
            Emaily
          </Link>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

//same as mapStateToProps(state) { return { auth: state.auth }} where auth from reducers/index.js
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
