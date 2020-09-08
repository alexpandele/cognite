import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import './UsersList.scss';
import users from "../../../../db/users";
import User from "./User/User";

class UsersList extends Component {
  static get propTypes () {
    return {
      user: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        wsKey: PropTypes.string
      }),
      onSelectUser: PropTypes.func.isRequired,
    };
  }

  static get defaultProps () {
    return {
      user: null,
    };
  }

  constructor (props) {
    super(props);

    this.handleSelectUser = this.handleSelectUser.bind(this);
  }

  shouldComponentUpdate () {
    return true;
  }

  handleSelectUser (user) {
    const {onSelectUser} = this.props;
    onSelectUser(user);
  }

  render () {
    const {user} = this.props;
    const conversations = users.filter(u => u.id !== user.id)

    return (
      <div className="UsersList">
        {conversations.map(user => (
          <User
            key={user.id}
            onClick={this.handleSelectUser}
            user={user}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(UsersList);
