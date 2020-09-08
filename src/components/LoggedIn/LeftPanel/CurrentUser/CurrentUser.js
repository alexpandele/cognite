import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import './CurrentUser.scss';
import {setUser} from "../../../../store/reducers/auth";
import events from "../../../../events";
import {resetMessages} from "../../../../store/reducers/messages";

class CurrentUser extends Component {
  static get propTypes () {
    return {
      user: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        wsKey: PropTypes.string,
      }),
      setUser: PropTypes.func.isRequired
    };
  }

  static get defaultProps () {
    return {
      user: null,
    };
  }

  constructor (props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }


  shouldComponentUpdate () {
    return true;
  }

  handleLogout ( ev ) {
    ev.preventDefault();
    const {setUser, resetMessages} = this.props;
    events.user.onLogout.emit();
    resetMessages();
    setUser(null);
  }

  render () {
    const {user} = this.props;
    return (
      <div className="CurrentUser">
        <a
          href="/"
          className="logout"
          onClick={this.handleLogout}
        >
					logout
				</a>
        <div className="user">
          {user.name}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => {
      dispatch(setUser(user));
    },
    resetMessages: () => {
      dispatch(resetMessages());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentUser);
