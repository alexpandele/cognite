import React from 'react';
import './App.scss';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import LoggedIn from "./components/LoggedIn/LoggedIn";
import Landing from "./components/Landing/Landing";

class App extends React.Component {
  static get propTypes () {
    return {
      loggedInUser: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        wsKey: PropTypes.string,
      }),
    };
  }

  static get defaultProps () {
    return {
      loggedInUser: null,
    };
  }

  render () {
    const {loggedInUser} = this.props;

    if (loggedInUser) return <LoggedIn/>;
    if (!loggedInUser) return <Landing/>;
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.auth.user
});

export default connect(mapStateToProps)(App);
