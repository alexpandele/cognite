import React, {Component} from 'react';
import users from "../../db/users";
import './Landing.scss';
import {connect} from 'react-redux';
import {setUser} from "../../store/reducers/auth";
import PropTypes from "prop-types";

class Landing extends Component {
  static get propTypes () {
    return {
      setUser: PropTypes.func.isRequired,
    };
  }

  constructor (props) {
    super(props);

    this.selectedUser = null;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectUser = this.handleSelectUser.bind(this);
  }

  shouldComponentUpdate () {
    return true;
  }

  handleSubmit (ev) {
    const {setUser} = this.props;
    ev.preventDefault();
    if (this.selectedUser > 0) {
      const user = users.find(u => u.id === this.selectedUser);
      if (user) setUser(user);
    }
  }

  handleSelectUser (ev) {
    this.selectedUser = parseInt(ev.target.value);
  }

  render () {
    return (
      <div className="Landing">
        <form onSubmit={this.handleSubmit}>
          <div className="title">
            Select your login
          </div>
          <select onChange={this.handleSelectUser}>
            <option value={0}>
              - Select -
            </option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          <input
            type="submit"
            value="Login"
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => {
      dispatch(setUser(user));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
